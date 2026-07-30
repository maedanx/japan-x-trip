import { expect, test } from "@playwright/test";

function attachDiagnostics(page: import("@playwright/test").Page) {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(`PAGE_ERROR ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") failures.push(`CONSOLE_ERROR ${message.text()}`);
  });
  page.on("response", (response) => {
    if (response.status() >= 500) failures.push(`HTTP_${response.status()} ${response.url()}`);
  });
  return failures;
}

async function choose(page: import("@playwright/test").Page, label: string) {
  await page.getByRole("radio", { name: new RegExp(label, "i") }).click();
  await page.getByRole("button", { name: /^(next|see my result)/i }).click();
}

test("diagnosis supports navigation, result, comparison, and restart", async ({ page }) => {
  const failures = attachDiagnostics(page);
  const response = await page.goto("/diagnosis?qa=diagnosis", { waitUntil: "domcontentloaded" });

  expect(response).not.toBeNull();
  expect(response!.status()).toBeLessThan(500);

  await page.getByRole("button", { name: /start my diagnosis/i }).click();

  await expect(page.getByText("Question 1 of 7")).toBeVisible();
  await expect(page.getByRole("button", { name: /^(next|see my result)/i })).toBeDisabled();

  await page.getByRole("radio", { name: /^Yes/i }).first().click();
  await page.getByRole("button", { name: /^(next|see my result)/i }).click();
  await expect(page.getByText("Question 2 of 7")).toBeVisible();

  await page.getByRole("button", { name: /previous/i }).click();
  await expect(page.getByText("Question 1 of 7")).toBeVisible();
  await expect(page.getByRole("radio", { name: /^Yes/i }).first()).toHaveAttribute("aria-checked", "true");
  await page.getByRole("button", { name: /^(next|see my result)/i }).click();

  await choose(page, "Yes");
  await choose(page, "1 person");
  await choose(page, "4–7 days");
  await choose(page, "Regular");
  await choose(page, "Yes, immediately");
  await choose(page, "Digital setup only");

  // Scope to each method card via its status badge text (unique per card,
  // unlike the method name heading, which is repeated by the top result
  // banner and can also appear on unrelated method cards).
  const bestMatchCard = page.locator("article").filter({ hasText: "Best match" });
  await expect(bestMatchCard).toBeVisible();
  await expect(bestMatchCard.getByRole("heading", { level: 4 })).toBeVisible();
  await expect(bestMatchCard.locator("ul li").first()).toBeVisible();

  const strongAlternativeCard = page
    .locator("article")
    .filter({ hasText: "Strong alternative" });
  await expect(strongAlternativeCard).toBeVisible();
  await expect(strongAlternativeCard.getByRole("heading", { level: 4 })).toBeVisible();
  await expect(strongAlternativeCard.locator("ul li").first()).toBeVisible();

  await expect(
    page.getByRole("heading", { name: /How each method fits your trip/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Japan eSIM guide/i }).first()).toBeVisible();

  const recommendedCard = page.locator("article", {
    hasText: "Recommended for you",
  });
  await expect(recommendedCard).toBeVisible();

  const recommendedCta = recommendedCard.getByRole("link", {
    name: /Check price and availability/i,
  });
  await expect(recommendedCta).toBeVisible();
  const ctaHref = await recommendedCta.getAttribute("href");
  expect(ctaHref, "recommended CTA should have a non-empty href").toBeTruthy();
  await expect(
    recommendedCard.getByText(/Japan X Trip may earn a commission/i),
  ).toBeVisible();

  await page.getByRole("button", { name: /start again/i }).click();
  await expect(page.getByText("Question 1 of 7")).toBeVisible();
  expect(failures, failures.join("\n")).toEqual([]);
});
