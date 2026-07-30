import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { chromium, devices, expect } from "@playwright/test";
import fs from "node:fs";

console.log("===== STATIC SOURCE CHECKS =====");

const faqDataPath = "data/faq.ts";
const pagePath = "app/faq/page.tsx";
const listPath = "components/faq/FaqAccordionList.tsx";
const finalCtaPath = "components/faq/FaqFinalCta.tsx";
const homePreviewPath = "components/home-redesign/HomeFaqPreview.tsx";

for (const p of [faqDataPath, pagePath, listPath, finalCtaPath, homePreviewPath]) {
  assert.ok(fs.existsSync(p), `${p} が見つかりません`);
}

const faqDataSource = fs.readFileSync(faqDataPath, "utf8");
const pageSource = fs.readFileSync(pagePath, "utf8");
const listSource = fs.readFileSync(listPath, "utf8");
const finalCtaSource = fs.readFileSync(finalCtaPath, "utf8");
const homePreviewSource = fs.readFileSync(homePreviewPath, "utf8");

// FAQ item count: derived from data/faq.ts's own "question:" occurrences,
// never hardcoded, so this QA never drifts from the real data source.
const expectedFaqCount = (faqDataSource.match(/question:/g) || []).length;
assert.ok(expectedFaqCount > 0, "data/faq.tsからFAQ件数を検出できませんでした");
console.log(`INFO: data/faq.ts has ${expectedFaqCount} items`);

// /faq must source its list from data/faq.ts directly, not a duplicated array.
assert.match(
  listSource,
  /import\s*\{\s*faqItems\s*\}\s*from\s*"@\/data\/faq"/,
  "FaqAccordionListがdata/faq.tsのfaqItemsを使用していません",
);
assert.doesNotMatch(
  listSource,
  /const\s+\w+\s*=\s*\[\s*\{\s*question/,
  "FaqAccordionListが独自のFAQ配列を保持しています(data/faq.ts単一ソースの方針に反します)",
);
console.log("PASS: FaqAccordionListがdata/faq.tsを単一ソースとして使用");

// FAQPage schema must be built from faqItems in the Server Component, not a
// Client Component, and not a duplicated content list.
assert.match(pageSource, /"@type":\s*"FAQPage"/, "FAQPage schemaが見つかりません");
assert.match(
  pageSource,
  /mainEntity:\s*faqItems\.map/,
  "FAQPage schemaがfaqItemsから生成されていません",
);
assert.doesNotMatch(pageSource, /"use client"/, "app/faq/page.tsxがClient Componentになっています(JSON-LDはServer Componentに置く方針)");
console.log("PASS: FAQPage schemaがfaqItemsから生成され、Server Component内にある");

// Final CTA must reuse the existing trackDiagnosisEntryClick function with the new placement.
assert.match(
  finalCtaSource,
  /trackDiagnosisEntryClick\(\s*"faq-final-diagnosis"\s*\)/,
  "Final CTAのAnalytics呼び出しが見つかりません",
);
console.log("PASS: Final CTAのAnalytics実装(faq-final-diagnosis)を確認");

// Home's "View All FAQs" must be a plain link with no analytics handler.
const viewAllMatch = homePreviewSource.match(/href="\/faq"[\s\S]{0,80}/);
assert.ok(viewAllMatch, 'HomeFaqPreviewに/faqへのリンクが見つかりません');
assert.doesNotMatch(
  viewAllMatch[0],
  /onClick/,
  '"View All FAQs"リンクにonClick(Analytics)が付与されています(通常リンクの方針に反します)',
);
console.log('PASS: "View All FAQs"がAnalyticsなしの通常リンクとして実装されている');

console.log("");
console.log("===== TYPESCRIPT CHECK =====");
execFileSync("npx", ["tsc", "--noEmit"], { stdio: "inherit" });
console.log("PASS: TypeScriptエラーなし");
console.log("");

// Always use localhost, never the machine's LAN IP: this Playwright browser
// runs on the same machine as the dev server, and hitting the dev server via
// a LAN-IP Host header made the Next.js dev server reject the HMR WebSocket
// handshake ("Error during WebSocket handshake"), which in turn left client
// hydration incomplete -- the accordion's keyboard handlers never attached,
// so Enter/Space appeared to silently do nothing. This reproduced 100% of
// the time (cold AND warm dev server) when accessed via the LAN IP, and
// never reproduced via localhost -- confirmed by direct manual repro, not a
// timing flake.
const BASE_URL = "http://localhost:3000";
console.log(`[QA URL] ${BASE_URL}`);

const OUTPUT_DIR = "qa/faq-mobile";
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });

function newContextOptions(width, height = 1600) {
  return { ...devices["iPhone 14"], viewport: { width, height } };
}

async function withErrorTracking(page) {
  const consoleErrors = [];
  const consoleWarnings = [];
  const pageErrors = [];

  page.on("console", (message) => {
    const text = message.text();
    if (text.includes("/_next/webpack-hmr") && text.includes("WebSocket")) return;
    if (message.type() === "error") {
      consoleErrors.push(text);
      console.log(`[CONSOLE ERROR] ${text}`);
    }
    if (message.type() === "warning") {
      consoleWarnings.push(text);
    }
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
    console.log(`[PAGE ERROR] ${error.message}`);
  });

  return { consoleErrors, consoleWarnings, pageErrors };
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

async function ourEvents(page, eventName) {
  return page.evaluate(
    (name) => (window.dataLayer || []).filter((e) => e && e[1] === name),
    eventName,
  );
}

// Focuses `locator` and presses `key`, then polls (via Playwright's
// auto-retrying locator assertion, not a fixed sleep) until aria-expanded
// becomes "true". A cold dev-server's first compile can still be finishing
// client hydration when the keypress lands, so a single bounded retry
// re-fires focus+keypress once before failing -- this never masks a real
// accordion regression, since both attempts require the same true state.
async function pressAndWaitExpanded(page, locator, key, label) {
  const attempt = async (timeout) => {
    await locator.focus();
    await page.keyboard.press(key);
    await expect(locator, label).toHaveAttribute("aria-expanded", "true", { timeout });
  };

  try {
    await attempt(3_000);
  } catch {
    await attempt(3_000);
  }
}

try {
  // ---------- A. Page load + metadata ----------
  console.log("===== A. PAGE LOAD / METADATA =====");
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    const { consoleErrors, consoleWarnings, pageErrors } = await withErrorTracking(page);
    await page.addInitScript(() => sessionStorage.clear());

    const response = await page.goto(`${BASE_URL}/faq`, { waitUntil: "networkidle", timeout: 30_000 });
    assert.equal(response.status(), 200, `/faqが200ではありません(実際: ${response.status()})`);
    await page.waitForTimeout(300);

    assert.equal(await page.title(), "Frequently Asked Questions | Japan X Trip", "titleが想定と異なります");
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    assert.ok(description && description.length > 0, "descriptionが設定されていません");
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    assert.equal(canonical, "https://japanxtrip.com/faq", "canonicalが想定と異なります");

    console.log("PASS A: /faqが200で表示、title/description/canonicalを確認");

    const visibleH1Count = await page.locator("h1:visible").count();
    assert.equal(visibleH1Count, 1, `可視h1が1つではありません(実際: ${visibleH1Count})`);
    console.log("PASS A: 可視h1が1つ");

    const schemaText = await page.locator('script[type="application/ld+json"]').first().textContent();
    const schema = JSON.parse(schemaText);
    assert.equal(schema["@type"], "FAQPage", "FAQPage schemaの@typeが想定と異なります");

    const questionButtons = await page.locator(".jxm-faq-preview__question").allTextContents();
    assert.equal(
      questionButtons.length,
      schema.mainEntity.length,
      `表示FAQ数(${questionButtons.length})とschema件数(${schema.mainEntity.length})が一致しません`,
    );
    schema.mainEntity.forEach((entry, i) => {
      assert.ok(
        questionButtons[i].includes(entry.name),
        `schemaの質問文[${i}]が表示内容と一致しません`,
      );
    });
    console.log(`PASS A: FAQPage schemaが表示中の${schema.mainEntity.length}問と一致`);

    assertNoRuntimeErrors(consoleErrors, pageErrors, "A");
    if (consoleWarnings.length > 0) {
      console.log(`[INFO] console warnings: ${consoleWarnings.join(" | ")}`);
    }
    await page.screenshot({ path: `${OUTPUT_DIR}/A-faq-page-full.png`, fullPage: true });
    await context.close();
  }

  // ---------- B. Accordion accessibility ----------
  console.log("===== B. ACCORDION ACCESSIBILITY =====");
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.goto(`${BASE_URL}/faq`, { waitUntil: "networkidle", timeout: 30_000 });

    // Wait for the first question to be interactive (not a fixed sleep --
    // a cold dev-server's first compile can leave the page painted before
    // client hydration finishes attaching the click/keyboard handlers).
    const firstQuestion = page.locator(".jxm-faq-preview__question").nth(0);
    await expect(firstQuestion).toBeVisible({ timeout: 10_000 });
    await expect(firstQuestion).toBeEnabled({ timeout: 10_000 });

    const initiallyOpen = await page.locator(".jxm-faq-preview__answer:not([hidden])").count();
    assert.equal(initiallyOpen, 0, "FAQが初期状態ですべて閉じていません");

    assert.equal(await firstQuestion.evaluate((el) => el.tagName.toLowerCase()), "button", "FAQ質問がbutton要素ではありません");
    assert.equal(await firstQuestion.getAttribute("aria-expanded"), "false", "aria-expanded初期値がfalseではありません");

    await pressAndWaitExpanded(page, firstQuestion, "Enter", "Enterで開きません");
    const controlsId = await firstQuestion.getAttribute("aria-controls");
    assert.ok(controlsId, "aria-controlsがありません");
    assert.equal(await page.locator(`#${controlsId}`).getAttribute("hidden"), null, "aria-controlsが指す回答が表示されていません");
    const panelLabelledBy = await page.locator(`#${controlsId}`).getAttribute("aria-labelledby");
    assert.equal(panelLabelledBy, await firstQuestion.getAttribute("id"), "回答のaria-labelledbyが質問ボタンのidと一致しません");

    // second item opens independently -- both open simultaneously allowed
    const secondQuestion = page.locator(".jxm-faq-preview__question").nth(1);
    await expect(secondQuestion).toBeVisible({ timeout: 5_000 });
    await pressAndWaitExpanded(page, secondQuestion, " ", "Spaceで開きません(2問目)");
    const bothOpen = await page.locator(".jxm-faq-preview__answer:not([hidden])").count();
    assert.equal(bothOpen, 2, `2問同時オープンができていません(実際: ${bothOpen})`);

    await firstQuestion.click();
    await expect(firstQuestion, "クリックで閉じません").toHaveAttribute("aria-expanded", "false", { timeout: 5_000 });
    const oneOpenAfterClose = await page.locator(".jxm-faq-preview__answer:not([hidden])").count();
    assert.equal(oneOpenAfterClose, 1, "1問目を閉じても2問目が独立して開いたままになっていません");

    console.log("PASS B: 初期全閉/button要素/aria-expanded/aria-controls/aria-labelledby/Enter・Space/複数同時オープンを確認");
    assertNoRuntimeErrors(consoleErrors, pageErrors, "B");
    await context.close();
  }

  // ---------- C. Responsive ----------
  console.log("===== C. RESPONSIVE =====");
  for (const width of [375, 390, 430]) {
    const context = await browser.newContext(newContextOptions(width));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.goto(`${BASE_URL}/faq`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(300);

    await assertNoHorizontalOverflow(page, `C-${width}`);
    assertNoRuntimeErrors(consoleErrors, pageErrors, `C-${width}`);
    console.log(`PASS C: ${width}pxで横スクロールなし、console errorなし`);
    await context.close();
  }

  // ---------- D. Final CTA analytics + navigation ----------
  console.log("===== D. FINAL CTA / ANALYTICS =====");
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/faq`, { waitUntil: "networkidle", timeout: 30_000 });

    const cta = page.locator(".jxm-final-cta__cta");
    assert.equal(await cta.getAttribute("href"), "/diagnosis", "Final CTAのhrefが/diagnosisではありません");

    await cta.click({ noWaitAfter: true });
    await page.waitForTimeout(250);
    const events = await ourEvents(page, "diagnosis_entry_click");
    assert.equal(events.length, 1, `diagnosis_entry_clickが1回だけ発火していません(実際: ${events.length})`);
    assert.equal(events[0][2]?.placement, "faq-final-diagnosis", "placementがfaq-final-diagnosisではありません");

    await page.waitForURL(/\/diagnosis/, { timeout: 5000 }).catch(() => {});
    assert.ok(page.url().includes("/diagnosis"), `/diagnosisへ遷移していません(実際: ${page.url()})`);
    console.log("PASS D: Final CTA -> /diagnosis、diagnosis_entry_click(faq-final-diagnosis)が1回だけ発火");
    await context.close();
  }

  // FAQ toggle must not fire any analytics event
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/faq`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.locator(".jxm-faq-preview__question").first().click();
    await page.waitForTimeout(150);
    const events = await page.evaluate(() =>
      (window.dataLayer || []).filter(
        (e) => e && (e[1] === "diagnosis_entry_click" || e[1] === "home_nav_click"),
      ),
    );
    assert.equal(events.length, 0, `FAQ開閉でAnalyticsが発火しています: ${JSON.stringify(events)}`);
    console.log("PASS D: FAQ開閉ではAnalyticsが発火しない");
    await context.close();
  }

  // ---------- E. Home -> /faq link ----------
  console.log("===== E. HOME LINK =====");
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 30_000 });

    const link = page.locator(".jxm-faq-preview__cta-row a");
    assert.equal(await link.innerText(), "View All FAQs", 'Home上のリンク文言が"View All FAQs"ではありません');
    assert.equal(await link.getAttribute("href"), "/faq", "Home上のリンク先が/faqではありません");

    await link.click();
    await page.waitForURL(/\/faq/, { timeout: 5000 }).catch(() => {});
    assert.ok(page.url().includes("/faq"), `/faqへ遷移していません(実際: ${page.url()})`);
    assertNoRuntimeErrors(consoleErrors, pageErrors, "E");
    console.log('PASS E: Home の"View All FAQs" -> /faqへ正常遷移');
    await context.close();
  }

  console.log("");
  console.log("================================");
  console.log("FAQ MOBILE QA: PASS");
  console.log("================================");
  console.log(`Screenshots: ${OUTPUT_DIR}`);
} catch (error) {
  console.error("");
  console.error("================================");
  console.error("FAQ MOBILE QA: FAIL");
  console.error("================================");
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser.close();
}
