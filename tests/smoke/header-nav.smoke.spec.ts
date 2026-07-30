import { expect, test } from "@playwright/test";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Compare", href: "/compare" },
  { name: "eSIM", href: "/esim" },
  { name: "Pocket WiFi", href: "/pocket-wifi" },
  { name: "SIM Card", href: "/sim-card" },
  { name: "Diagnosis", href: "/diagnosis" },
  { name: "Guides", href: "/airport" },
] as const;

test("mobile home header navigation has no broken or misdirected links", async ({
  page,
}) => {
  await page.goto("/?qa=header-nav");
  await page.waitForLoadState("networkidle");

  const header = page.getByRole("banner");

  const logo = header.getByRole("link", {
    name: "Japan X Trip home",
    exact: true,
  });

  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute("href", "/");

  const menuButton = header.getByRole("button", {
    name: "Open menu",
  });

  await expect(menuButton).toBeVisible();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  await menuButton.click();

  const closeButton = header.getByRole("button", {
    name: "Close menu",
  });

  await expect(closeButton).toBeVisible();
  await expect(closeButton).toHaveAttribute("aria-expanded", "true");

  const mobileDialog = page.getByRole("dialog", {
    name: "Mobile navigation",
  });

  await expect(mobileDialog).toBeVisible();

  const mobileNav = mobileDialog.getByRole("navigation", {
    name: "Mobile primary",
  });

  for (const item of NAV_LINKS) {
    const link = mobileNav.getByRole("link", {
      name: item.name,
      exact: true,
    });

    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", item.href);
  }

  const mobileCta = mobileDialog.getByRole("link", {
    name: "Build My Travel Kit",
    exact: true,
  });

  await expect(mobileCta).toBeVisible();
  await expect(mobileCta).toHaveAttribute("href", "/diagnosis");

  await page.keyboard.press("Escape");

  await expect(
    header.getByRole("button", {
      name: "Open menu",
    }),
  ).toBeVisible();

  await expect(mobileDialog).not.toBeVisible();
});
