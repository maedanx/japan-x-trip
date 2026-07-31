import { test, expect, Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const outputRoot = path.join(process.cwd(), "artifacts", "qa", "screenshots");

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

async function collectLayoutReport(page: Page) {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    const all = Array.from(document.querySelectorAll<HTMLElement>("body *"));

    const visible = all.filter((el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0
      );
    });

    const overflowing = visible
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          className: String(el.className || "").slice(0, 160),
          text: (el.innerText || "").trim().replace(/\s+/g, " ").slice(0, 120),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter((item) => item.left < -2 || item.right > viewportWidth + 2)
      .slice(0, 50);

    const tinyTargets = Array.from(
      document.querySelectorAll<HTMLElement>("button, a, input, select")
    )
      .filter((el) => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      })
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          text: (
            el.innerText ||
            el.getAttribute("aria-label") ||
            el.getAttribute("title") ||
            ""
          )
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 100),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      })
      .filter((item) => item.width < 44 || item.height < 44)
      .slice(0, 50);

    const fixedElements = visible
      .filter((el) => getComputedStyle(el).position === "fixed")
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          className: String(el.className || "").slice(0, 160),
          text: (el.innerText || "").trim().replace(/\s+/g, " ").slice(0, 100),
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
          height: Math.round(rect.height),
          viewportHeight,
        };
      });

    return {
      viewportWidth,
      viewportHeight,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      horizontalOverflow:
        Math.max(
          document.documentElement.scrollWidth,
          document.body.scrollWidth
        ) - viewportWidth,
      overflowing,
      tinyTargets,
      fixedElements,
    };
  });
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

// The Home Hero renders both a Desktop (.jxt-hero-cta) and Mobile
// (.jxm-hero) variant simultaneously; CSS hides whichever doesn't match the
// viewport, but both stay in the DOM. Scoping to the matching container and
// its own CTA copy avoids matching the other, hidden variant.
function isMobileViewport(page: Page) {
  const viewport = page.viewportSize();
  return !viewport || viewport.width <= 900;
}

function heroPrimaryCta(page: Page, isMobile: boolean) {
  return isMobile
    ? page.locator(".jxm-hero").getByRole("link", { name: "Find My Perfect Plan" })
    : page.locator(".jxt-hero-cta").getByRole("link", { name: "Build My Travel Kit" });
}

function heroSecondaryCta(page: Page, isMobile: boolean) {
  return isMobile
    ? page.locator(".jxm-hero").getByRole("link", { name: "Compare All Options" })
    : page.locator(".jxt-hero-cta").getByRole("link", { name: "Compare Options" });
}

test("baseline layout, runtime health, and visual regression", async ({
  page,
}, testInfo) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedResponses: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("/?qa=baseline", { waitUntil: "domcontentloaded" });
  await expect(page.locator("h1:visible")).toContainText("Stay Connected");

  const projectName = testInfo.project.name;
  const dir = path.join(outputRoot, projectName);
  ensureDir(dir);

  await page.screenshot({
    path: path.join(dir, "homepage-full.png"),
    fullPage: true,
    animations: "disabled",
  });
  await page.screenshot({
    path: path.join(dir, "homepage-viewport.png"),
    fullPage: false,
    animations: "disabled",
  });

  const report = await collectLayoutReport(page);
  fs.writeFileSync(
    path.join(dir, "layout-report.json"),
    JSON.stringify(report, null, 2)
  );

  expect(
    report.horizontalOverflow,
    JSON.stringify(report.overflowing, null, 2)
  ).toBeLessThanOrEqual(2);

  expect(pageErrors).toEqual([]);
  expect(
    consoleErrors.filter(
      (message) => !/favicon|Download the React DevTools/i.test(message)
    )
  ).toEqual([]);
  expect(
    failedResponses.filter(
      (line) => !/favicon|apple-icon|icon\.png|robots\.txt/i.test(line)
    )
  ).toEqual([]);

  // NOTE: the Header + Hero redesign replaced the previous homepage content,
  // so this baseline screenshot needs a fresh snapshot approval
  // (`npm run qa:update`) before this assertion will pass again.
  await expect(page).toHaveScreenshot("homepage-full.png", {
    fullPage: true,
    animations: "disabled",
  });
});

test("primary CTA is visible and routes to diagnosis", async ({
  page,
}, testInfo) => {
  await page.goto("/?qa=primary-cta", { waitUntil: "domcontentloaded" });

  const primaryCta = heroPrimaryCta(page, isMobileViewport(page));
  await primaryCta.scrollIntoViewIfNeeded();
  await expect(primaryCta).toBeVisible();
  await expect(primaryCta).toHaveAttribute("href", "/diagnosis");

  const dir = path.join(outputRoot, testInfo.project.name);
  ensureDir(dir);
  await primaryCta.screenshot({ path: path.join(dir, "hero-primary-cta.png") });
});

test("secondary CTA and benefits are visible", async ({ page }, testInfo) => {
  await page.goto("/?qa=secondary-cta", { waitUntil: "domcontentloaded" });

  const mobile = isMobileViewport(page);
  const secondaryCta = heroSecondaryCta(page, mobile);
  await secondaryCta.scrollIntoViewIfNeeded();
  await expect(secondaryCta).toBeVisible();
  await expect(secondaryCta).toHaveAttribute("href", "/compare");

  // The Mobile Hero renders a benefits list (components/home-redesign/Hero.tsx
  // MOBILE_BENEFITS); the Desktop Hero has no equivalent element, so this
  // assertion only applies at mobile widths rather than inventing a Desktop
  // stand-in that doesn't exist.
  if (mobile) {
    const benefits = page.locator(".jxm-hero-v2__benefits");
    await expect(benefits).toBeVisible();
    await expect(benefits).toContainText("Compare the best plans");
    await expect(benefits).toContainText("Personalized recommendation");
    await expect(benefits).toContainText("Clear setup support");

    const dir = path.join(outputRoot, testInfo.project.name);
    ensureDir(dir);
    await benefits.screenshot({ path: path.join(dir, "hero-benefits-list.png") });
  }
});

test("core touch controls remain selectable", async ({ page }) => {
  await page.goto("/?qa=touch", { waitUntil: "domcontentloaded" });

  const mobile = isMobileViewport(page);
  const primaryCta = heroPrimaryCta(page, mobile);
  const secondaryCta = heroSecondaryCta(page, mobile);
  const controls = [primaryCta, secondaryCta];

  // The hamburger button only exists below the header's desktop breakpoint;
  // on wide viewports the inline nav replaces it, so skip it there.
  const viewport = page.viewportSize();
  if (!viewport || viewport.width <= 900) {
    controls.push(page.getByRole("button", { name: /open menu/i }));
  }

  for (const control of controls) {
    await control.scrollIntoViewIfNeeded();
    await expect(control).toBeVisible();
    await expect(control).toBeEnabled();
    const box = await control.boundingBox();
    expect(box, "control should have a bounding box").not.toBeNull();
    expect(box!.height, "touch target should be at least 44px tall").toBeGreaterThanOrEqual(44);
  }
});
