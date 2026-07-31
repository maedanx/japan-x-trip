import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { chromium, devices } from "@playwright/test";
import { expect } from "@playwright/test";
import fs from "node:fs";
import { networkInterfaces } from "node:os";

const STORAGE_KEY = "japan-x-trip:diagnosis:v1";

console.log("===== STATIC SOURCE CHECKS =====");

const clientPath = "components/mobile/CompareMobile.tsx";
const pagePath = "app/compare/page.tsx";

assert.ok(fs.existsSync(clientPath), `${clientPath} が見つかりません`);
const clientSource = fs.readFileSync(clientPath, "utf8");
const pageSource = fs.readFileSync(pagePath, "utf8");

assert.match(
  clientSource,
  /"Travel eSIM"[\s\S]*"Physical SIM card"[\s\S]*"Pocket Wi-Fi"/,
  "3方式(Travel eSIM / Physical SIM card / Pocket Wi-Fi)の定義が見つかりません",
);
console.log("PASS: 3方式カードのデータ定義を確認");

assert.doesNotMatch(
  clientSource,
  /role="table"/,
  "旧role=\"table\"比較が残っています",
);
assert.doesNotMatch(
  clientSource,
  /activeTab/,
  "非機能タブ(activeTab)が残っています",
);
console.log("PASS: 旧比較表・非機能タブが残っていないことを確認");

assert.doesNotMatch(
  clientSource,
  /High Speed Unlimited/,
  "根拠のない\"High Speed Unlimited\"表現が残っています",
);
assert.doesNotMatch(
  clientSource,
  /"\$\$\$?"|Price Range/,
  "$ / $$ / $$$ による価格帯表示が残っています",
);
console.log("PASS: 根拠のない速度・価格表現が残っていないことを確認");

assert.match(
  clientSource,
  /\/affiliate-disclosure/,
  "Affiliate Disclosureへのリンクが見つかりません",
);
assert.match(
  clientSource,
  /\/how-we-review-providers/,
  "How we review providersへのリンクが見つかりません",
);
console.log("PASS: Affiliate Disclosure / How we review providers リンクを確認");

assert.match(
  clientSource,
  /connectivityProviders\.slice\(0,\s*6\)/,
  "Provider 6件のデータ接続(connectivityProviders.slice(0, 6))が見つかりません",
);
console.log("PASS: Provider 6件のデータ接続を確認");

// FAQ must be a single shared source: page.tsx builds the schema AND passes
// the same array into CompareMobile as a prop -- CompareMobile must not
// define its own separate faqs array.
assert.doesNotMatch(
  clientSource,
  /const faqs\s*=\s*\[/,
  "CompareMobileが独自のfaqs配列を保持しています(構造化データと分離するため禁止)",
);
assert.match(
  pageSource,
  /mainEntity:\s*faqs\.map/,
  "FAQPage構造化データがfaqs配列から生成されていません",
);
assert.match(
  pageSource,
  /<CompareMobile\s+faqs=\{faqs\}\s*\/>/,
  "CompareMobileへ共通faqsがpropsで渡されていません",
);
console.log("PASS: FAQデータが構造化データと共有されていることを確認");

assert.match(
  clientSource,
  /analyzeDiagnosis|loadDiagnosisState/,
  "Diagnosis連携のimportが見つかりません",
);
console.log("PASS: Diagnosis連携のimportを確認");

assert.match(
  clientSource,
  /placement="card"/,
  "Provider CTAのanalytics placementが見つかりません",
);
assert.match(
  clientSource,
  /trackDiagnosisEntryClick\(\s*"compare-/,
  "Diagnosis CTAのanalytics placement(compare-*)が見つかりません",
);
console.log("PASS: Analytics placementの実装を確認");

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

// Falls back to localhost when no LAN IP is available (e.g. a different
// network setup) instead of failing the whole suite on an environment
// detail unrelated to the app under test.
const BASE_URL = `http://${localIp ?? "localhost"}:3000`;
console.log(`[QA URL] ${BASE_URL}`);

const OUTPUT_DIR = "qa/compare-mobile";
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const EXPECTED_PROVIDER_ORDER = [
  "Sakura Mobile",
  "Airalo",
  "Ubigi",
  "Nomad eSIM",
  "Japan Wireless",
  "NINJA WiFi",
];

// best=sim (Physical SIM card), alternative=wifi (Pocket Wi-Fi),
// not-recommended=[esim] -- matches the "No eSIM but unlocked, comfortable
// with SIM" scenario already covered by qa-diagnosis-engine.mjs.
const COMPLETED_STATE = {
  version: 1,
  answers: { esim: 1, unlocked: 0, party: 0, duration: 2, usage: 1, arrival: 1, handling: 1 },
  currentStep: 6,
  showResult: true,
  updatedAt: new Date().toISOString(),
};

const browser = await chromium.launch({ headless: true });

function newContextOptions(width) {
  return { ...devices["iPhone 14"], viewport: { width, height: 900 } };
}

async function withErrorTracking(page) {
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    if (text.includes("/_next/webpack-hmr") && text.includes("WebSocket")) return;
    consoleErrors.push(text);
    console.log(`[CONSOLE ERROR] ${text}`);
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
    console.log(`[PAGE ERROR] ${error.message}`);
  });

  return { consoleErrors, pageErrors };
}

function assertNoRuntimeErrors(consoleErrors, pageErrors, label) {
  if (pageErrors.length > 0) {
    throw new Error(`${label}: JavaScript page errors: ${pageErrors.join(" | ")}`);
  }
  if (consoleErrors.length > 0) {
    throw new Error(`${label}: Console errors: ${consoleErrors.join(" | ")}`);
  }
}

async function assertNoHorizontalOverflow(page, label) {
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

function visibleProviderCards(page) {
  return page.locator('[class*="providerCard"]:visible');
}

async function getProviderOrder(page) {
  return visibleProviderCards(page).locator("h3").allInnerTexts();
}

try {
  // ---------- A. Undiagnosed ----------
  console.log("===== A. UNDIAGNOSED =====");
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.addInitScript(() => sessionStorage.clear());

    await page.goto(`${BASE_URL}/compare`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(300);

    await assertNoHorizontalOverflow(page, "A-375");
    await expect(page.locator('text="Your diagnosis result"')).toHaveCount(0);

    const cardCount = await visibleProviderCards(page).count();
    assert.equal(cardCount, 6, `Provider 6件が表示されていません(実際: ${cardCount})`);

    const order = await getProviderOrder(page);
    assert.deepEqual(order, EXPECTED_PROVIDER_ORDER, `Provider並び順が変化しました: ${JSON.stringify(order)}`);

    await expect(page.getByText(/take the 30-second diagnosis/i)).toBeVisible();

    const methodHeadings = await page.locator('[class*="methodCard"] h3').allInnerTexts();
    assert.deepEqual(
      methodHeadings,
      ["Travel eSIM", "Physical SIM card", "Pocket Wi-Fi"],
      `3方式カードの見出しが想定と異なります: ${JSON.stringify(methodHeadings)}`,
    );

    const bodyText = (await page.evaluate(() => document.body.innerText)).toLowerCase();
    assert.ok(bodyText.includes("which option should you start with?"), "FAQセクションが見つかりません");
    assert.ok(bodyText.includes("get a starting recommendation"), "Final CTAが見つかりません");

    await page.screenshot({ path: `${OUTPUT_DIR}/01-undiagnosed-full.png`, fullPage: true });

    assertNoRuntimeErrors(consoleErrors, pageErrors, "A");
    console.log("PASS A: 未診断時の表示が正常(Summaryなし/3方式カード/導線/Provider6件/FAQ/Final CTA)");
    await context.close();
  }

  // ---------- B. Diagnosed ----------
  console.log("===== B. DIAGNOSED =====");
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.addInitScript(
      ({ key, value }) => sessionStorage.setItem(key, JSON.stringify(value)),
      { key: STORAGE_KEY, value: COMPLETED_STATE },
    );

    await page.goto(`${BASE_URL}/compare`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(300);

    await expect(page.locator('text="Your diagnosis result"').first()).toBeVisible();
    await expect(page.locator('text="Best Match"').first()).toBeVisible();

    // The Phase 1 "Not sure which to pick?" prompt must be hidden once a
    // diagnosis result is already shown (Phase 2.1 redundancy fix).
    await expect(page.getByText(/not sure which to pick\?/i)).toHaveCount(0);

    const order = await getProviderOrder(page);
    assert.deepEqual(order, EXPECTED_PROVIDER_ORDER, `診断済み時にProvider並び順が変化しました: ${JSON.stringify(order)}`);

    // best=sim -> only providers whose connectionTypes include "Physical SIM"
    // may show the match note (Sakura Mobile, NINJA WiFi).
    const matchNoteCount = await page.getByText(/matches your recommended option/i).count();
    assert.equal(matchNoteCount, 2, `"Matches your recommended option"の件数が想定外です(実際: ${matchNoteCount})`);

    const airaloCard = page.locator('[class*="providerCard"]:visible', { hasText: "Airalo" });
    await expect(airaloCard.getByText(/matches your recommended option/i)).toHaveCount(0);

    await assertNoHorizontalOverflow(page, "B-375");
    assertNoRuntimeErrors(consoleErrors, pageErrors, "B");
    console.log("PASS B: 診断済み時のSummary/Best Match/並び順不変/一致表示/重複導線非表示を確認");
    await context.close();
  }

  // ---------- C. Corrupted session ----------
  console.log("===== C. CORRUPTED SESSION =====");
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.addInitScript(
      ({ key }) => sessionStorage.setItem(key, "{not valid json!!"),
      { key: STORAGE_KEY },
    );

    await page.goto(`${BASE_URL}/compare`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(300);

    await expect(page.locator('text="Your diagnosis result"')).toHaveCount(0);
    const cardCount = await visibleProviderCards(page).count();
    assert.equal(cardCount, 6, `壊れたsession時にProvider 6件が表示されていません(実際: ${cardCount})`);

    await assertNoHorizontalOverflow(page, "C-375");
    assertNoRuntimeErrors(consoleErrors, pageErrors, "C");
    console.log("PASS C: 壊れたsessionから通常表示へ安全にフォールバック、console errorなし");
    await context.close();
  }

  // ---------- D. Responsive ----------
  console.log("===== D. RESPONSIVE =====");
  for (const width of [375, 390, 430]) {
    const context = await browser.newContext(newContextOptions(width));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.addInitScript(() => sessionStorage.clear());

    await page.goto(`${BASE_URL}/compare`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(300);

    await assertNoHorizontalOverflow(page, `D-${width}`);
    assertNoRuntimeErrors(consoleErrors, pageErrors, `D-${width}`);
    console.log(`PASS D: ${width}pxで横スクロールなし`);
    await context.close();
  }

  // ---------- E. CTA / Analytics ----------
  console.log("===== E. CTA / ANALYTICS =====");
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.addInitScript(() => sessionStorage.clear());

    await page.goto(`${BASE_URL}/compare`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(300);

    const sakuraCard = page.locator('[class*="providerCard"]:visible', { hasText: "Sakura Mobile" });

    const reviewLink = sakuraCard.getByRole("link", { name: /read review/i });
    await expect(reviewLink).toBeVisible();
    assert.equal(await reviewLink.getAttribute("href"), "/reviews/sakura-mobile", "Review内部リンクのhrefが不正です");

    const primaryLink = sakuraCard.getByRole("link", { name: /check plans/i });
    await expect(primaryLink).toBeVisible();
    assert.equal(await primaryLink.getAttribute("target"), "_blank", "outbound CTAのtargetが_blankではありません");
    assert.match(await primaryLink.getAttribute("rel"), /noopener/, "outbound CTAのrelにnoopenerが含まれません");

    const primaryBox = await primaryLink.boundingBox();
    assert.ok(primaryBox.height >= 44, `Primary CTAの高さが44px未満です(${primaryBox.height})`);
    const reviewBox = await reviewLink.boundingBox();
    assert.ok(reviewBox.height >= 44, `Secondary CTAの高さが44px未満です(${reviewBox.height})`);

    const [popup] = await Promise.all([context.waitForEvent("page"), primaryLink.click()]);
    await page.waitForTimeout(300);
    await popup.close();

    const affiliateEvents = await page.evaluate(() =>
      (window.dataLayer || []).filter((entry) => entry && entry[1] === "affiliate_cta_click"),
    );
    assert.equal(affiliateEvents.length, 1, `affiliate_cta_clickが1回発火していません(実際: ${affiliateEvents.length})`);
    const affiliateParams = affiliateEvents[0][2];
    assert.equal(affiliateParams.page, "/compare", "affiliate_cta_clickのpageが不正です");
    assert.equal(affiliateParams.provider, "Sakura Mobile", "affiliate_cta_clickのproviderが不正です");
    assert.equal(affiliateParams.placement, "card", "affiliate_cta_clickのplacementが不正です");
    console.log("PASS E: outbound CTAのtarget/rel/タップ領域/affiliate_cta_clickを確認");

    const diagnosisLink = page.getByRole("link", { name: /take the 30-second diagnosis/i });
    await diagnosisLink.click();
    await page.waitForTimeout(200);
    const diagnosisEvents = await page.evaluate(() =>
      (window.dataLayer || []).filter((entry) => entry && entry[1] === "diagnosis_entry_click"),
    );
    assert.equal(diagnosisEvents.length, 1, `diagnosis_entry_clickが1回発火していません(実際: ${diagnosisEvents.length})`);
    assert.equal(
      diagnosisEvents[0][2].placement,
      "compare-method-diagnosis",
      "Diagnosis CTAのplacementがcompare-method-diagnosisではありません",
    );
    console.log("PASS E: Diagnosis CTA(compare-method-diagnosis)のanalyticsを確認、ページ表示時には発火していない");

    assertNoRuntimeErrors(consoleErrors, pageErrors, "E");
    await context.close();
  }

  // ---------- F. Accessibility ----------
  console.log("===== F. ACCESSIBILITY =====");
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.addInitScript(() => sessionStorage.clear());

    await page.goto(`${BASE_URL}/compare`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(300);

    const visibleH1Count = await page.locator("h1:visible").count();
    assert.equal(visibleH1Count, 1, `画面に表示されているh1が1つではありません(実際: ${visibleH1Count})`);

    const firstGuideItem = page.locator('[class*="decisionGuideItem"]').first();
    const firstSummary = firstGuideItem.locator("summary");
    await firstSummary.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(150);
    assert.ok(await firstGuideItem.evaluate((el) => el.open), "Quick Decision Guideがキーボード(Enter)で開きません");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(150);
    assert.ok(!(await firstGuideItem.evaluate((el) => el.open)), "Quick Decision Guideがキーボード(Enter)で閉じません");

    const methodLink = page.locator('a[class*="methodLink"]').first();
    await methodLink.focus();
    const outline = await methodLink.evaluate((el) => getComputedStyle(el).outlineStyle);
    assert.notEqual(outline, "none", "方式カードのリンクにfocus-visibleのoutlineがありません");

    await assertNoHorizontalOverflow(page, "F-375");

    assertNoRuntimeErrors(consoleErrors, pageErrors, "F");
    console.log("PASS F: 表示中h1が1件、details/summaryのキーボード操作、focus-visibleを確認");
    await context.close();
  }

  console.log("");
  console.log("================================");
  console.log("COMPARE MOBILE QA: PASS");
  console.log("================================");
  console.log(`Screenshots: ${OUTPUT_DIR}`);
} catch (error) {
  console.error("");
  console.error("================================");
  console.error("COMPARE MOBILE QA: FAIL");
  console.error("================================");
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser.close();
}
