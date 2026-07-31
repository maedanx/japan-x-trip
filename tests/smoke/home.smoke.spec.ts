import { test, expect } from "@playwright/test";

function attachDiagnostics(page: import("@playwright/test").Page) {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(`PAGE_ERROR ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") failures.push(`CONSOLE_ERROR ${message.text()}`);
  });
  page.on("response", (response) => {
    if (response.status() >= 400) failures.push(`HTTP_${response.status()} ${response.url()}`);
  });
  return failures;
}

// The Home Hero renders a Desktop (.jxt-hero-cta) and Mobile (.jxm-hero)
// variant simultaneously; CSS hides whichever doesn't match the viewport.
// Scoping CTA lookups to the matching container avoids matching the other,
// hidden variant.
function isMobileViewport(page: import("@playwright/test").Page) {
  const viewport = page.viewportSize();
  return !viewport || viewport.width <= 900;
}

test("critical homepage hero smoke", async ({ page }) => {
  const failures = attachDiagnostics(page);
  const response = await page.goto("/?qa=smoke", { waitUntil: "domcontentloaded" });

  expect(response, "Homepage did not return a response").not.toBeNull();
  expect(response!.status(), `Homepage HTTP status: ${response!.status()}`).toBeLessThan(500);

  await expect(page.locator("body")).toBeVisible();

  await expect(page.getByRole("banner")).toBeVisible();

  const heading = page.locator("h1:visible");
  await expect(heading).toHaveCount(1);
  await expect(heading).toContainText("Stay Connected");
  await expect(heading).toContainText("in Japan");

  const mobile = isMobileViewport(page);
  const heroContainer = page.locator(mobile ? ".jxm-hero" : ".jxt-hero-cta");
  await expect(heroContainer).toBeVisible();

  const primaryCta = mobile
    ? heroContainer.getByRole("link", { name: "Find My Perfect Plan" })
    : heroContainer.getByRole("link", { name: "Build My Travel Kit" });
  await expect(primaryCta).toBeVisible();
  await expect(primaryCta).toHaveAttribute("href", "/diagnosis");

  const secondaryCta = mobile
    ? heroContainer.getByRole("link", { name: "Compare All Options" })
    : heroContainer.getByRole("link", { name: "Compare Options" });
  await expect(secondaryCta).toBeVisible();
  await expect(secondaryCta).toHaveAttribute("href", "/compare");

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
    await expect(page.locator(selector), `${label} section should be visible`).toBeVisible();
  }

  await expect(page.getByRole("contentinfo")).toBeVisible();

  await page.waitForTimeout(300);
  expect(failures, failures.join("\n")).toEqual([]);
});
