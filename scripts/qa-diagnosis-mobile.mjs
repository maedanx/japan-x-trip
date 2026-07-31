import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { chromium, devices } from "@playwright/test";
import { expect } from "@playwright/test";
import fs from "node:fs";
import { networkInterfaces } from "node:os";

console.log("===== STATIC SOURCE CHECKS =====");

const clientSource = fs.readFileSync(
  "app/diagnosis/DiagnosisClient.tsx",
  "utf8",
);
const cssSource = fs.readFileSync(
  "app/diagnosis/page.module.css",
  "utf8",
);

assert.match(
  clientSource,
  /Best match/,
  "Best matchの表示コードが見つかりません",
);
assert.match(
  clientSource,
  /Strong alternative/,
  "Strong alternativeの表示コードが見つかりません",
);
assert.match(
  clientSource,
  /Not suitable/,
  "Not suitableの表示コードが見つかりません",
);
assert.match(
  clientSource,
  /analysis\.primaryReasons/,
  "primaryReasonsが使用されていません",
);
assert.match(
  clientSource,
  /analysis\.primaryCautions/,
  "primaryCautionsが使用されていません",
);
assert.match(
  clientSource,
  /analysis\.assessments/,
  "assessmentsが使用されていません",
);
assert.doesNotMatch(
  clientSource,
  /rankedMethods|relativeWidth/,
  "旧スコアバー処理(rankedMethods/relativeWidth)がUIに残っています",
);

const hasMobileSingleColumnCards = cssSource
  .split("@media")
  .some(
    (block) =>
      /max-width:\s*720px/.test(block) &&
      /\.recommendationCards\s*\{\s*grid-template-columns:\s*1fr;/.test(
        block,
      ),
  );

assert.ok(
  hasMobileSingleColumnCards,
  "モバイル用1カラムCSS(.recommendationCards)が見つかりません",
);

console.log("PASS: Best match / Strong alternative / Not suitable の表示コードを確認");
console.log("PASS: primaryReasons / primaryCautions / assessments を使用");
console.log("PASS: 旧スコアバー処理(rankedMethods/relativeWidth)は残っていません");
console.log("PASS: モバイル用1カラムCSSを確認");

console.log("");
console.log("===== TYPESCRIPT CHECK =====");

execFileSync("npx", ["tsc", "--noEmit"], { stdio: "inherit" });

console.log("PASS: TypeScriptエラーなし");
console.log("");

const localIp = Object.values(networkInterfaces())
  .flatMap((interfaces) => interfaces ?? [])
  .find(
    (network) =>
      network.family === "IPv4" &&
      !network.internal &&
      network.address.startsWith("192.168."),
  )?.address;

if (!localIp) {
  throw new Error("MacのLAN IPを取得できませんでした");
}

const BASE_URL = `http://${localIp}:3000`;

console.log(`[QA URL] ${BASE_URL}`);
const OUTPUT_DIR = "qa/diagnosis-mobile";

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch({
  headless: true,
});

const context = await browser.newContext({
  ...devices["iPhone 14"],
  viewport: {
    width: 375,
    height: 812,
  },
});

const page = await context.newPage();

const consoleErrors = [];
const pageErrors = [];

page.on("console", (message) => {
  if (message.type() !== "error") return;

  const text = message.text();

  // 開発時のHMR WebSocketエラーだけは機能QAから除外
  if (
    text.includes("/_next/webpack-hmr") &&
    text.includes("WebSocket")
  ) {
    return;
  }

  consoleErrors.push(text);
  console.log(`[CONSOLE ERROR] ${text}`);
});

page.on("pageerror", (error) => {
  pageErrors.push(error.message);
  console.log(`[PAGE ERROR] ${error.message}`);
});

async function saveScreenshot(name) {
  await page.screenshot({
    path: `${OUTPUT_DIR}/${name}.png`,
    fullPage: true,
  });
}

async function assertNoHorizontalOverflow(label) {
  const measurements = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
  }));

  console.log(`[WIDTH] ${label}`, measurements);

  expect(
    measurements.documentWidth,
    `${label}: documentに横スクロールがあります`,
  ).toBeLessThanOrEqual(measurements.viewportWidth + 1);

  expect(
    measurements.bodyWidth,
    `${label}: bodyに横スクロールがあります`,
  ).toBeLessThanOrEqual(measurements.viewportWidth + 1);
}

try {
  console.log("===== OPEN DIAGNOSIS =====");

  await page.goto(`${BASE_URL}/diagnosis?mobileqa=3`, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });

  const startButton = page.getByRole("button", {
    name: /start my diagnosis/i,
  });

  await expect(startButton).toBeVisible();
  await expect(startButton).toBeEnabled();

  await assertNoHorizontalOverflow("intro");
  await saveScreenshot("01-intro");

  console.log("===== START DIAGNOSIS =====");

  await startButton.click();

  const firstQuestionProgress = page.getByRole("progressbar", {
    name: /question 1 of 7/i,
  });

  await expect(firstQuestionProgress).toBeVisible({
    timeout: 10_000,
  });

  await expect(
    page.getByRole("heading", {
      name: /does your phone support esim/i,
    }),
  ).toBeVisible();

  await saveScreenshot("02-question-1");

  console.log("===== CHECK DISABLED NEXT =====");

  let nextButton = page.getByRole("button", {
    name: /^next/i,
  });

  await expect(nextButton).toBeVisible();
  await expect(nextButton).toBeDisabled();

  console.log("PASS: 未回答時はNextが無効");

  console.log("===== CHECK BACK DISABLED ON Q1 =====");

  const backButtonQ1 = page.getByRole("button", { name: /back/i });

  await expect(backButtonQ1).toBeDisabled();

  console.log("PASS: Q1ではBackが無効");

  console.log("===== ANSWER QUESTION 1 =====");

  let radios = page.getByRole("radio");
  await expect(radios.first()).toBeVisible();

  await radios.first().click();
  await expect(radios.first()).toHaveAttribute("aria-checked", "true");
  await expect(nextButton).toBeEnabled();

  await nextButton.click();

  await expect(
    page.getByRole("progressbar", {
      name: /question 2 of 7/i,
    }),
  ).toBeVisible();

  console.log("PASS: Question 2へ進みました");

  console.log("===== CHECK BACK AND ANSWER RETENTION =====");

  const previousButton = page.getByRole("button", {
    name: /back/i,
  });

  await previousButton.click();

  await expect(
    page.getByRole("progressbar", {
      name: /question 1 of 7/i,
    }),
  ).toBeVisible();

  radios = page.getByRole("radio");
  await expect(radios.first()).toHaveAttribute("aria-checked", "true");

  console.log("PASS: Back後も回答が保持されています");

  nextButton = page.getByRole("button", {
    name: /^next/i,
  });

  await nextButton.click();

  console.log("===== COMPLETE ALL QUESTIONS =====");

  for (let questionNumber = 2; questionNumber <= 7; questionNumber += 1) {
    await expect(
      page.getByRole("progressbar", {
        name: new RegExp(`question ${questionNumber} of 7`, "i"),
      }),
    ).toBeVisible();

    radios = page.getByRole("radio");
    await expect(radios.first()).toBeVisible();

    await radios.first().click();
    await expect(radios.first()).toHaveAttribute("aria-checked", "true");

    const actionButton =
      questionNumber === 7
        ? page.getByRole("button", {
            name: /see my result/i,
          })
        : page.getByRole("button", {
            name: /^next/i,
          });

    await expect(actionButton).toBeEnabled();
    await actionButton.click();

    console.log(`PASS: Question ${questionNumber} 完了`);
  }

  console.log("===== VERIFY RESULT =====");

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: /travel esim|physical sim card|pocket wi-fi|check your phone first/i,
    }),
  ).toBeVisible({
    timeout: 10_000,
  });

  await expect(
    page.getByText(/based on your seven answers/i),
  ).toBeVisible();

  await expect(
    page.getByText(/recommended for you/i),
  ).toBeVisible();

  await expect(
    page.getByRole("link", {
      name: /check price and availability/i,
    }),
  ).toBeVisible();

  await expect(
    page.getByText(/why this fits/i),
  ).toBeVisible();

  await expect(
    page.getByText(/check before buying/i),
  ).toBeVisible();

  await expect(
    page.getByText(/your connection shortlist/i),
  ).toBeVisible();

  await expect(
    page.getByText(/best match/i).first(),
  ).toBeVisible();

  await expect(
    page.getByText(/strong alternative/i).first(),
  ).toBeVisible();

  await expect(
    page.getByText(
      /recommendations are based on your answers about compatibility/i,
    ),
  ).toBeVisible();

  console.log("PASS: 新しい結果カード構造(Best match / Strong alternative / 注記)を確認");

  await assertNoHorizontalOverflow("result");
  await saveScreenshot("03-result");

  console.log("PASS: 結果画面とCTAを確認しました");

  console.log("===== VERIFY RESULT BACK =====");

  await page.getByRole("button", {
    name: /change the last answer/i,
  }).click();

  await expect(
    page.getByRole("progressbar", {
      name: /question 7 of 7/i,
    }),
  ).toBeVisible();

  radios = page.getByRole("radio");
  await expect(radios.first()).toHaveAttribute("aria-checked", "true");

  console.log("PASS: 結果から戻っても最終回答を保持");

  await page.getByRole("button", { name: /see my result/i }).click();

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: /travel esim|physical sim card|pocket wi-fi|check your phone first/i,
    }),
  ).toBeVisible({ timeout: 10_000 });

  console.log("===== BACK NAVIGATION REGRESSION (Q1 -> Q2 -> Back -> Q1 -> change -> Result) =====");

  await page.getByRole("button", { name: /start again/i }).click();

  await expect(
    page.getByRole("progressbar", { name: /question 1 of 7/i }),
  ).toBeVisible({ timeout: 10_000 });

  radios = page.getByRole("radio");
  await radios.nth(0).click();
  await expect(radios.nth(0)).toHaveAttribute("aria-checked", "true");

  nextButton = page.getByRole("button", { name: /^next/i });
  await expect(nextButton).toBeEnabled();
  await nextButton.click();

  await expect(
    page.getByRole("progressbar", { name: /question 2 of 7/i }),
  ).toBeVisible();

  radios = page.getByRole("radio");
  await radios.nth(1).click();
  await expect(radios.nth(1)).toHaveAttribute("aria-checked", "true");

  const backButtonQ2 = page.getByRole("button", { name: /back/i });
  await expect(backButtonQ2).toBeEnabled();
  await backButtonQ2.click();

  await expect(
    page.getByRole("progressbar", { name: /question 1 of 7/i }),
  ).toBeVisible();

  radios = page.getByRole("radio");
  await expect(radios.nth(0)).toHaveAttribute("aria-checked", "true");

  console.log("PASS: Back で Q2 → Q1、直前の回答を保持したまま戻れる");

  await radios.nth(1).click();
  await expect(radios.nth(1)).toHaveAttribute("aria-checked", "true");
  await expect(radios.nth(0)).toHaveAttribute("aria-checked", "false");

  console.log("PASS: Back後に回答を変更できる");

  nextButton = page.getByRole("button", { name: /^next/i });
  await expect(nextButton).toBeEnabled();
  await nextButton.click();

  for (let questionNumber = 2; questionNumber <= 7; questionNumber += 1) {
    await expect(
      page.getByRole("progressbar", {
        name: new RegExp(`question ${questionNumber} of 7`, "i"),
      }),
    ).toBeVisible();

    radios = page.getByRole("radio");
    await expect(radios.first()).toBeVisible();
    await radios.first().click();
    await expect(radios.first()).toHaveAttribute("aria-checked", "true");

    const actionButton =
      questionNumber === 7
        ? page.getByRole("button", { name: /see my result/i })
        : page.getByRole("button", { name: /^next/i });

    await expect(actionButton).toBeEnabled();
    await actionButton.click();
  }

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: /travel esim|physical sim card|pocket wi-fi|check your phone first/i,
    }),
  ).toBeVisible({ timeout: 10_000 });

  await expect(
    page
      .getByText(/recommended for you|compatibility check required/i)
      .first(),
  ).toBeVisible();

  await assertNoHorizontalOverflow("back-navigation-result");

  console.log("PASS: Back→回答変更→最後まで進行してもResultが正常に表示される");

  console.log("===== RAPID CLICK GUARD (same-tick double click on an unvisited step) =====");

  await page.getByRole("button", { name: /start again/i }).click();

  await expect(
    page.getByRole("progressbar", { name: /question 1 of 7/i }),
  ).toBeVisible({ timeout: 10_000 });

  radios = page.getByRole("radio");
  await radios.nth(0).click();
  await expect(radios.nth(0)).toHaveAttribute("aria-checked", "true");

  nextButton = page.getByRole("button", { name: /^next/i });
  await expect(nextButton).toBeEnabled();
  await nextButton.click();

  await expect(
    page.getByRole("progressbar", { name: /question 2 of 7/i }),
  ).toBeVisible();

  radios = page.getByRole("radio");
  await radios.nth(0).click();
  await expect(radios.nth(0)).toHaveAttribute("aria-checked", "true");

  // Fire two synchronous clicks in the same page task (a true same-tick
  // double click, before React can commit the first click's re-render) to
  // verify Question 3 is never silently skipped.
  await page.evaluate(() => {
    const button = [...document.querySelectorAll("button")].find((element) =>
      /^next/i.test(element.textContent?.trim() ?? ""),
    );
    button?.click();
    button?.click();
  });

  await expect(
    page.getByRole("progressbar", { name: /question 3 of 7/i }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: /who and what needs internet/i }),
  ).toBeVisible();

  console.log("PASS: 同一tick内の連続クリックでも質問が1問だけ進み、スキップは発生しない");

  if (pageErrors.length > 0) {
    throw new Error(
      `JavaScript page errors: ${pageErrors.join(" | ")}`,
    );
  }

  if (consoleErrors.length > 0) {
    throw new Error(
      `Console errors: ${consoleErrors.join(" | ")}`,
    );
  }

  console.log("");
  console.log("================================");
  console.log("MOBILE DIAGNOSIS QA: PASS");
  console.log("================================");
  console.log(`Screenshots: ${OUTPUT_DIR}`);
} catch (error) {
  await saveScreenshot("99-failure");

  console.error("");
  console.error("================================");
  console.error("MOBILE DIAGNOSIS QA: FAIL");
  console.error("================================");
  console.error(error);

  process.exitCode = 1;
} finally {
  await browser.close();
}
