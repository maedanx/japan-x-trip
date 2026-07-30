import { test, expect } from "@playwright/test";
import { affiliateLinks } from "@/data/affiliateLinks";

function attachDiagnostics(page: import("@playwright/test").Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  return { consoleErrors, pageErrors };
}

test("sim-card mobile page renders the Mobile Master product layout", async ({
  page,
}) => {
  const { consoleErrors, pageErrors } = attachDiagnostics(page);

  await page.setViewportSize({ width: 390, height: 844 });
  const response = await page.goto("/sim-card", { waitUntil: "domcontentloaded" });
  expect(response, "sim-card did not return a response").not.toBeNull();
  expect(response!.status(), `sim-card HTTP status: ${response!.status()}`).toBeLessThan(400);

  // No horizontal scroll at 390x844
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth, `scrollWidth=${scrollWidth} clientWidth=${clientWidth}`).toBeLessThanOrEqual(clientWidth);

  // Mobile Hero heading (the desktop article's h1 also exists in the DOM,
  // hidden via CSS -- only the mobile heading should be visible here)
  const visibleHeading = page.locator("h1").filter({ hasText: "SIM Cards for Japan" });
  await expect(visibleHeading).toBeVisible();

  // Old long-form article must not be visible on mobile
  await expect(
    page.getByText("Use a physical SIM card in Japan without arrival-day surprises"),
  ).toBeHidden();

  // Sakura Mobile Travel SIM product card
  await expect(page.getByText("Sakura Mobile Travel SIM")).toBeVisible();
  await expect(page.getByText("AVAILABLE", { exact: true })).toBeVisible();

  // Check Price affiliate link
  const checkPriceLink = page.getByRole("link", { name: "Check Price" });
  await expect(checkPriceLink).toBeVisible();
  await expect(checkPriceLink).toHaveAttribute(
    "href",
    affiliateLinks.sakuraMobile.travelSim,
  );
  await expect(checkPriceLink).toHaveAttribute("target", "_blank");
  const rel = await checkPriceLink.getAttribute("rel");
  expect(rel).toContain("sponsored");
  expect(rel).toContain("noopener");
  expect(rel).toContain("noreferrer");

  // No fabricated price/data/duration/claims
  const bodyText = await page.locator("body").innerText();
  expect(bodyText).not.toMatch(/\$\d|¥\d|Unlimited|Best Seller/);

  // Diagnosis CTAs (the Header's own desktop-nav diagnosis link is hidden at
  // this viewport, so check for a visible one among the page's own content)
  const visibleDiagnosisLinks = page.locator('a[href="/diagnosis"]:visible');
  await expect(visibleDiagnosisLinks.first()).toBeVisible();
  expect(await visibleDiagnosisLinks.count()).toBeGreaterThan(0);

  // Footer renders (mobile footer accordion groups)
  const mobileFooter = page.locator(".jxm-footer");
  await expect(mobileFooter).toBeVisible();
  await expect(mobileFooter.getByText("Explore", { exact: true })).toBeVisible();

  // Header hamburger menu opens and closes
  const menuButton = page.locator(".jx-header__menu-button");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  expect(pageErrors, pageErrors.join("\n")).toEqual([]);
  expect(
    consoleErrors.filter((message) => !/Download the React DevTools|webpack-hmr/i.test(message)),
    consoleErrors.join("\n"),
  ).toEqual([]);
});

test("sim-card desktop page keeps the existing article", async ({ page }) => {
  const { consoleErrors, pageErrors } = attachDiagnostics(page);

  await page.setViewportSize({ width: 1440, height: 1200 });
  const response = await page.goto("/sim-card", { waitUntil: "domcontentloaded" });
  expect(response!.status()).toBeLessThan(400);

  // Existing desktop article heading is present and visible
  const heading = page.getByRole("heading", {
    name: "Use a physical SIM card in Japan without arrival-day surprises",
  });
  await expect(heading).toBeVisible();

  // Article body content remains (a paragraph from the existing long-form copy)
  await expect(
    page.getByText("A physical travel SIM is a small removable card"),
  ).toBeVisible();

  // FAQ section from the original article remains
  await expect(
    page.getByRole("heading", { name: "Japan SIM card questions" }),
  ).toBeVisible();

  // Mobile product layout must not be shown on desktop
  await expect(page.getByText("SIM Cards for Japan")).toBeHidden();

  expect(pageErrors, pageErrors.join("\n")).toEqual([]);
  expect(
    consoleErrors.filter((message) => !/Download the React DevTools|webpack-hmr/i.test(message)),
    consoleErrors.join("\n"),
  ).toEqual([]);
});
