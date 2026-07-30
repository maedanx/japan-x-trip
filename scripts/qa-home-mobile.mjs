import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { chromium, devices, expect } from "@playwright/test";
import fs from "node:fs";
import { networkInterfaces } from "node:os";

console.log("===== STATIC SOURCE CHECKS =====");

const homeRedesignPath = "components/HomeRedesign.tsx";
const heroPath = "components/home-redesign/Hero.tsx";
const faqPreviewPath = "components/home-redesign/HomeFaqPreview.tsx";
const finalCtaPath = "components/home-redesign/FinalDiagnosisCta.tsx";
const benefitsPath = "components/home-redesign/MobileBenefitsStrip.tsx";

for (const p of [homeRedesignPath, heroPath, faqPreviewPath, finalCtaPath, benefitsPath]) {
  assert.ok(fs.existsSync(p), `${p} が見つかりません`);
}

const homeRedesignSource = fs.readFileSync(homeRedesignPath, "utf8");
const heroSource = fs.readFileSync(heroPath, "utf8");
const faqPreviewSource = fs.readFileSync(faqPreviewPath, "utf8");
const finalCtaSource = fs.readFileSync(finalCtaPath, "utf8");

// Section order: Hero -> ConnectionFinder -> CompareIntroduction -> WhyJapanXTrip
// -> MobileBenefitsStrip -> HomeFaqPreview -> FinalDiagnosisCta
const sectionOrder = [
  "Hero",
  "ConnectionFinder",
  "CompareIntroduction",
  "WhyJapanXTrip",
  "MobileBenefitsStrip",
  "HomeFaqPreview",
  "FinalDiagnosisCta",
];
const positions = sectionOrder.map((name) => homeRedesignSource.indexOf(`<${name} />`));
assert.ok(
  positions.every((pos) => pos !== -1),
  `HomeRedesign.tsxに想定セクションが揃っていません: ${JSON.stringify(sectionOrder)}`,
);
assert.ok(
  positions.every((pos, i) => i === 0 || pos > positions[i - 1]),
  `HomeRedesign.tsxのセクション順序が想定と異なります: ${JSON.stringify(sectionOrder)}`,
);
console.log("PASS: Homeの7セクションが想定順序で描画されていることを確認");

// MobileTravelKit must remain removed from Home's render (Phase 4). The file
// itself is intentionally excluded from this release and is not required to
// exist on disk (e.g. it is absent in a clean git clone) -- only the absence
// of any import/render wiring in HomeRedesign.tsx is asserted here.
assert.doesNotMatch(
  homeRedesignSource,
  /MobileTravelKit/,
  "HomeRedesign.tsxがMobileTravelKitをimportまたは参照しています(Phase 4で表示から除外済み)",
);
console.log("PASS: HomeRedesign.tsxがMobileTravelKitをimport/描画していないことを確認");

// FAQ Preview must source its content from data/faq.ts, not invent its own array.
assert.match(
  faqPreviewSource,
  /import\s*\{\s*faqItems\s*\}\s*from\s*"@\/data\/faq"/,
  "HomeFaqPreviewがdata/faq.tsのfaqItemsを使用していません",
);
assert.doesNotMatch(
  faqPreviewSource,
  /const\s+PREVIEW_FAQS\s*=\s*\[/,
  "HomeFaqPreviewが独自のFAQ配列を保持しています(data/faq.ts単一ソースの方針に反します)",
);
console.log("PASS: FAQ Previewがdata/faq.tsを単一ソースとして使用していることを確認");

// Final Diagnosis CTA must reuse the existing trackDiagnosisEntryClick function.
assert.match(
  finalCtaSource,
  /trackDiagnosisEntryClick\(\s*"home-final-diagnosis"\s*\)/,
  "Final Diagnosis CTAのAnalytics呼び出しが見つかりません",
);
console.log("PASS: Final Diagnosis CTAのAnalytics実装を確認");

// No fabricated trust claims anywhere in the Home component tree.
const homeComponentFiles = fs
  .readdirSync("components/home-redesign")
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => `components/home-redesign/${f}`);
const allHomeSource = homeComponentFiles.map((f) => fs.readFileSync(f, "utf8")).join("\n");

// Scoped to the specific claims Phase 2 removed from Hero (4.8/5 rating,
// Best Price Guarantee, Easy Booking). Does NOT re-litigate MobileBenefitsStrip's
// own pre-existing, out-of-scope copy (e.g. its unrelated "24/7 Support" item),
// which was never targeted for removal and remains untouched by every phase.
const forbiddenPatterns = [
  { pattern: /4\.8\s*\/\s*5/, label: "根拠のない評価数値(4.8/5)" },
  { pattern: /2,500\+?\s*travelers/i, label: "根拠のないレビュー件数(2,500+ travelers)" },
  { pattern: /best price guarantee/i, label: "Best Price Guarantee表現" },
  { pattern: /easy booking/i, label: "Easy Booking表現(サイトの実態と矛盾)" },
  { pattern: /guaranteed/i, label: "guaranteed(保証)表現" },
];
for (const { pattern, label } of forbiddenPatterns) {
  assert.doesNotMatch(allHomeSource, pattern, `${label}がHomeコンポーネント内に残っています`);
}
console.log("PASS: 根拠のない評価・保証・支援表現がHomeに残っていないことを確認");

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

const BASE_URL = `http://${localIp ?? "localhost"}:3000`;
console.log(`[QA URL] ${BASE_URL}`);

const OUTPUT_DIR = "qa/home-mobile";
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });

function newContextOptions(width, height = 1600) {
  return { ...devices["iPhone 14"], viewport: { width, height } };
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

async function ourEvents(page, eventName) {
  return page.evaluate(
    (name) => (window.dataLayer || []).filter((e) => e && e[1] === name),
    eventName,
  );
}

try {
  // ---------- A. Section display ----------
  console.log("===== A. SECTION DISPLAY =====");
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.addInitScript(() => sessionStorage.clear());

    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(300);

    const sections = [
      { selector: ".jxm-hero", label: "Hero" },
      { selector: ".jxm-quick-diagnosis", label: "Quick Diagnosis" },
      { selector: ".jxm-compare-intro", label: "Compare Introduction" },
      { selector: ".jxm-why-jxt", label: "Why Japan X Trip" },
      { selector: ".jxm-benefits", label: "MobileBenefitsStrip" },
      { selector: ".jxm-faq-preview", label: "FAQ Preview" },
      { selector: ".jxm-final-cta", label: "Final Diagnosis CTA" },
    ];
    for (const { selector, label } of sections) {
      await expect(page.locator(selector), `${label}が表示されていません`).toBeVisible();
    }
    console.log("PASS A: Hero/Quick Diagnosis/Compare/Why/Benefits/FAQ/Final CTAがすべて表示されている");

    const faqQuestionCount = await page.locator(".jxm-faq-preview__question").count();
    assert.equal(faqQuestionCount, 4, `FAQ Previewの質問数が4問ではありません(実際: ${faqQuestionCount})`);
    console.log("PASS A: FAQ Previewが4問表示されている");

    await page.screenshot({ path: `${OUTPUT_DIR}/A-sections-full.png`, fullPage: true });
    assertNoRuntimeErrors(consoleErrors, pageErrors, "A");
    await context.close();
  }

  // ---------- B. Responsive ----------
  console.log("===== B. RESPONSIVE =====");
  for (const width of [375, 390, 430]) {
    const context = await browser.newContext(newContextOptions(width));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.addInitScript(() => sessionStorage.clear());

    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(300);

    await assertNoHorizontalOverflow(page, `B-${width}`);
    assertNoRuntimeErrors(consoleErrors, pageErrors, `B-${width}`);
    console.log(`PASS B: ${width}pxで横スクロールなし、console errorなし`);
    await context.close();
  }

  // ---------- C. Navigation / Analytics ----------
  console.log("===== C. NAVIGATION / ANALYTICS =====");
  const singleFireChecks = [
    { label: "Hero primary CTA", selector: ".jxm-hero-v2__primary", href: "/diagnosis", event: "diagnosis_entry_click", placement: "home-hero-primary" },
    { label: "Hero secondary CTA", selector: ".jxm-hero-v2__secondary", href: "/compare", event: "home_nav_click", placement: "home-hero-compare" },
    { label: "Compare Introduction CTA", selector: ".jxm-compare-intro__cta", href: "/compare", event: "home_nav_click", placement: "home-compare-all-options" },
    { label: "Why JXT - How We Review Providers", selector: ".jxm-why-jxt__link >> nth=0", href: "/how-we-review-providers", event: "home_nav_click", placement: "home-why-review-method" },
    { label: "Why JXT - Affiliate Disclosure", selector: ".jxm-why-jxt__link >> nth=1", href: "/affiliate-disclosure", event: "home_nav_click", placement: "home-why-affiliate-disclosure" },
    { label: "Final Diagnosis CTA", selector: ".jxm-final-cta__cta", href: "/diagnosis", event: "diagnosis_entry_click", placement: "home-final-diagnosis" },
  ];
  for (const check of singleFireChecks) {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.addInitScript(() => sessionStorage.clear());
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 30_000 });

    const el = page.locator(check.selector);
    assert.equal(await el.getAttribute("href"), check.href, `${check.label}: hrefが想定と異なります`);

    await el.click({ noWaitAfter: true });
    await page.waitForTimeout(250);
    const events = await ourEvents(page, check.event);
    assert.equal(events.length, 1, `${check.label}: ${check.event}が1回だけ発火していません(実際: ${events.length})`);
    assert.equal(events[0][2]?.placement, check.placement, `${check.label}: placementが想定と異なります`);

    assertNoRuntimeErrors(consoleErrors, pageErrors, check.label);
    console.log(`PASS C: ${check.label} -> ${check.href}, ${check.event}(${check.placement})が1回だけ発火`);
    await context.close();
  }

  // Header CTAs (desktop width + mobile menu)
  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.addInitScript(() => sessionStorage.clear());
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.locator(".jx-header__cta").click({ noWaitAfter: true });
    await page.waitForTimeout(250);
    const events = await ourEvents(page, "diagnosis_entry_click");
    assert.equal(events.length, 1, "Header desktop CTA: diagnosis_entry_clickが1回だけ発火していません");
    assert.equal(events[0][2]?.placement, "home-header-diagnosis", "Header desktop CTA: placementが想定と異なります");
    console.log("PASS C: Header desktop CTA -> /diagnosis, diagnosis_entry_click(home-header-diagnosis)が1回だけ発火");
    await context.close();
  }
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    await page.addInitScript(() => sessionStorage.clear());
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.locator(".jx-header__menu-button").click();
    await page.waitForTimeout(200);
    await page.locator(".jx-header__mobile-cta").click({ noWaitAfter: true });
    await page.waitForTimeout(250);
    const events = await ourEvents(page, "diagnosis_entry_click");
    assert.equal(events.length, 1, "Header mobile menu CTA: diagnosis_entry_clickが1回だけ発火していません");
    assert.equal(events[0][2]?.placement, "home-mobile-menu-diagnosis", "Header mobile menu CTA: placementが想定と異なります");
    console.log("PASS C: Header mobile menu CTA -> /diagnosis, diagnosis_entry_click(home-mobile-menu-diagnosis)が1回だけ発火");
    await context.close();
  }

  // Quick Diagnosis: invalid submit does not fire, valid submit fires once + answer retention
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    await page.addInitScript(() => sessionStorage.clear());
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 30_000 });

    const submit = page.locator(".jxm-quick-diagnosis__submit");
    assert.ok(await submit.isDisabled(), "Quick Diagnosis: 未回答時にSubmitが無効化されていません");

    await page.locator('.jxm-quick-choice:has-text("2 People")').first().click();
    await page.locator('.jxm-quick-choice--purpose:has-text("Social Media")').first().click();
    await page.locator('.jxm-quick-choice--days:has-text("4–7 Days")').first().click();
    assert.ok(await submit.isEnabled(), "Quick Diagnosis: 3問回答後にSubmitが有効化されていません");

    await submit.click({ noWaitAfter: true });
    await page.waitForTimeout(250);
    const events = await ourEvents(page, "diagnosis_entry_click");
    assert.equal(events.length, 1, `Quick Diagnosis: diagnosis_entry_clickが1回だけ発火していません(実際: ${events.length})`);
    assert.equal(events[0][2]?.placement, "home-quick-diagnosis", "Quick Diagnosis: placementが想定と異なります");

    const stored = await page.evaluate(() => {
      const raw = window.sessionStorage.getItem("japan-x-trip:diagnosis:v1");
      return raw ? JSON.parse(raw) : null;
    });
    assert.equal(stored?.answers?.party, 1, "Quick Diagnosis: party回答の保持が想定と異なります");
    assert.equal(stored?.answers?.usage, 1, "Quick Diagnosis: usage回答の保持が想定と異なります");
    assert.equal(stored?.answers?.duration, 1, "Quick Diagnosis: duration回答の保持が想定と異なります");
    console.log("PASS C: Quick Diagnosis submit(有効時のみ1回発火)と回答保持を確認");
    await context.close();
  }

  // Connection grid tiles (desktop width, hidden <=900px by design). Each
  // tile click navigates away from Home (real internal links), so each tile
  // gets its own fresh context/page rather than reusing one page across
  // sequential navigating clicks -- reusing one page here previously raced
  // against the navigation and was flaky.
  {
    const tiles = [
      { selector: ".jx-master-option--esim", href: "/esim", event: "home_nav_click", placement: "home-option-esim" },
      { selector: ".jx-master-option--wifi", href: "/pocket-wifi", event: "home_nav_click", placement: "home-option-pocket-wifi" },
      { selector: ".jx-master-option--sim", href: "/sim-card", event: "home_nav_click", placement: "home-option-sim-card" },
      { selector: ".jx-master-option--diagnosis", href: "/diagnosis", event: "diagnosis_entry_click", placement: "home-option-diagnosis" },
    ];
    for (const tile of tiles) {
      const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
      const page = await context.newPage();
      await page.addInitScript(() => sessionStorage.clear());
      await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 30_000 });

      assert.equal(await page.locator(tile.selector).getAttribute("href"), tile.href, `Connection grid ${tile.selector}: hrefが想定と異なります`);
      await page.locator(tile.selector).click({ noWaitAfter: true });
      await page.waitForTimeout(250);
      const events = await ourEvents(page, tile.event);
      assert.equal(events.length, 1, `Connection grid ${tile.selector}: ${tile.event}が1回だけ発火していません`);
      assert.equal(events[0][2]?.placement, tile.placement, `Connection grid ${tile.selector}: placementが想定と異なります`);
      await context.close();
    }
    console.log("PASS C: Connection grid 4タイル(eSIM/Pocket WiFi/SIM Card/Diagnosis)のAnalyticsを確認");
  }

  // No event fires just from loading the page
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    await page.addInitScript(() => sessionStorage.clear());
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 30_000 });
    const events = await page.evaluate(() =>
      (window.dataLayer || []).filter((e) => e && (e[1] === "diagnosis_entry_click" || e[1] === "home_nav_click")),
    );
    assert.equal(events.length, 0, `ページ表示だけでAnalyticsイベントが発火しています: ${JSON.stringify(events)}`);
    console.log("PASS C: ページ表示のみではdiagnosis_entry_click/home_nav_clickが発火しない");
    await context.close();
  }

  // ---------- D. Accessibility ----------
  console.log("===== D. ACCESSIBILITY =====");
  {
    const context = await browser.newContext(newContextOptions(375));
    const page = await context.newPage();
    const { consoleErrors, pageErrors } = await withErrorTracking(page);
    await page.addInitScript(() => sessionStorage.clear());
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 30_000 });

    const visibleH1Count = await page.locator("h1:visible").count();
    assert.equal(visibleH1Count, 1, `画面に表示されているh1が1つではありません(実際: ${visibleH1Count})`);

    // FAQ: closed initially, button semantics, aria-expanded/aria-controls, keyboard Enter/Space
    const initiallyOpen = await page.locator(".jxm-faq-preview__answer:not([hidden])").count();
    assert.equal(initiallyOpen, 0, "FAQ Previewが初期状態ですべて閉じていません");

    const firstQuestion = page.locator(".jxm-faq-preview__question").first();
    assert.equal(await firstQuestion.evaluate((el) => el.tagName.toLowerCase()), "button", "FAQ質問がbutton要素ではありません");
    assert.equal(await firstQuestion.getAttribute("aria-expanded"), "false", "FAQ質問のaria-expanded初期値がfalseではありません");

    await firstQuestion.focus();
    await page.keyboard.press("Enter");
    assert.equal(await firstQuestion.getAttribute("aria-expanded"), "true", "FAQ質問がEnterで開きません");
    const controlsId = await firstQuestion.getAttribute("aria-controls");
    assert.ok(controlsId, "FAQ質問にaria-controlsがありません");
    assert.equal(await page.locator(`#${controlsId}`).getAttribute("hidden"), null, "aria-controlsが指す回答が表示されていません");

    await page.keyboard.press("Space");
    assert.equal(await firstQuestion.getAttribute("aria-expanded"), "false", "FAQ質問がSpaceで閉じません");
    console.log("PASS D: FAQ Previewの初期状態/button要素/aria-expanded/aria-controls/キーボード操作を確認");

    // focus-visible spot check across key CTAs
    for (const selector of [
      ".jxm-hero-v2__primary",
      ".jxm-compare-intro__cta",
      ".jxm-why-jxt__link",
      ".jxm-faq-preview__question",
      ".jxm-final-cta__cta",
    ]) {
      const el = page.locator(selector).first();
      await el.focus();
      const outline = await el.evaluate((node) => getComputedStyle(node).outlineStyle);
      assert.notEqual(outline, "none", `${selector}にfocus-visibleのoutlineがありません`);
    }
    console.log("PASS D: Hero/Compare/WhyJapanXTrip/FAQ/Final CTAのfocus-visibleを確認");

    await assertNoHorizontalOverflow(page, "D-375");
    assertNoRuntimeErrors(consoleErrors, pageErrors, "D");
    await context.close();
  }

  // ---------- E. Image warnings (Hero fill images at their two real breakpoints) ----------
  console.log("===== E. IMAGE WARNINGS =====");
  for (const width of [375, 1024]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 } });
    const page = await context.newPage();
    const imageWarnings = [];
    page.on("console", (message) => {
      if (message.type() !== "warning") return;
      const text = message.text();
      if (text.includes("sizes") || text.includes("invalid \"position\"")) imageWarnings.push(text);
    });
    await page.addInitScript(() => sessionStorage.clear());
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(300);

    assert.equal(
      imageWarnings.length,
      0,
      `${width}px: Next.js Imageのsizes/position警告が発生しています: ${JSON.stringify(imageWarnings)}`,
    );
    console.log(`PASS E: ${width}pxでHero画像のsizes/position警告なし`);
    await context.close();
  }

  console.log("");
  console.log("================================");
  console.log("HOME MOBILE QA: PASS");
  console.log("================================");
  console.log(`Screenshots: ${OUTPUT_DIR}`);
} catch (error) {
  console.error("");
  console.error("================================");
  console.error("HOME MOBILE QA: FAIL");
  console.error("================================");
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser.close();
}
