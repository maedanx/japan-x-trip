import { expect, test } from "@playwright/test";
import { affiliateLinks } from "@/data/affiliateLinks";

async function choose(
  page: import("@playwright/test").Page,
  question: string,
  answer: string,
) {
  const fieldset = page.locator("fieldset").filter({
    has: page.locator("legend", {
      hasText: question,
    }),
  });

  await fieldset
    .getByRole("radio", {
      name: answer,
      exact: true,
    })
    .click();
}

test.beforeEach(async ({ page }) => {
  const response = await page.goto(
    "/pocket-wifi-for-family-japan?qa=family",
    { waitUntil: "domcontentloaded" },
  );

  expect(response).not.toBeNull();
  expect(response!.status()).toBeLessThan(500);
});

test("family diagnosis recommends individual eSIMs", async ({ page }) => {
  await choose(page, "How many people need internet?", "1–2 people");
  await choose(page, "Will your family ever split up?", "Yes, often");
  await choose(page, "Are all phones eSIM-compatible?", "Yes");
  await choose(page, "How many total devices will you connect?", "1–3");

  const result = page.locator('[data-family-result="esim"]');

  await expect(result).toBeVisible();
  await expect(
    result.getByRole("heading", { name: "Best Fit: Individual eSIMs" }),
  ).toBeVisible();
  await expect(
    result.getByRole("link", { name: "Compare Japan eSIM Plans" }),
  ).toHaveAttribute("href", "/best-esim-japan");
});

test("family diagnosis recommends one Pocket WiFi", async ({ page }) => {
  await choose(page, "How many people need internet?", "3–4 people");
  await choose(
    page,
    "Will your family ever split up?",
    "No, we will stay together",
  );
  await choose(page, "Are all phones eSIM-compatible?", "Not sure");
  await choose(page, "How many total devices will you connect?", "4–6");

  const result = page.locator('[data-family-result="pocket_wifi"]');

  await expect(result).toBeVisible();
  await expect(
    result.getByRole("heading", {
      name: "Best Fit: One Pocket WiFi for Your Family",
    }),
  ).toBeVisible();

  await expect(
    result.getByRole("link", {
      name: "Check Sakura Mobile Pocket WiFi",
    }),
  ).toHaveAttribute(
    "href",
    affiliateLinks.sakuraMobile.travelPocketWifi,
  );
});

test("family diagnosis recommends a hybrid and updates after an answer change", async ({
  page,
}) => {
  await choose(page, "How many people need internet?", "3–4 people");
  await choose(page, "Will your family ever split up?", "Sometimes");
  await choose(page, "Are all phones eSIM-compatible?", "Yes");
  await choose(page, "How many total devices will you connect?", "4–6");

  await expect(
    page.locator('[data-family-result="hybrid"]'),
  ).toBeVisible();

  await choose(page, "Will your family ever split up?", "Yes, often");

  await expect(page.locator('[data-family-result="esim"]')).toBeVisible();
  await expect(
    page.locator('[data-family-result="hybrid"]'),
  ).toHaveCount(0);
});

test("metadata and FAQ structured data are present once", async ({ page }) => {
  await expect(page).toHaveTitle(
    /Best Pocket WiFi for Families in Japan: Is One Router Enough\?/,
  );

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://japanxtrip.com/pocket-wifi-for-family-japan",
  );

  const jsonLdContents = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();

  const faqSchemas = jsonLdContents
    .map((content) => {
      try {
        return JSON.parse(content) as {
          "@type"?: string;
        };
      } catch {
        return null;
      }
    })
    .filter((schema) => schema?.["@type"] === "FAQPage");

  expect(faqSchemas).toHaveLength(1);
});
