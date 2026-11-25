let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 60000);

  test(
    "The h1 header content'",
    async () => {
      const firstLink = await page.$("header div div a");
      await firstLink.click();
      await page.waitForSelector("h1");
      const title2 = await page.title();
      expect(title2).toContain("GitHub");
    },
    60000
  );

  test(
    "The first link attribute",
    async () => {
      const actual = await page.$eval("a", (link) => link.getAttribute("href"));
      expect(actual).toEqual("#start-of-content");
    },
    60000
  );

  test(
    "The page contains Sign in button",
    async () => {
      const button = await page.waitForXPath(
        "//a[contains(normalize-space(.), 'Sign up for free')]",
        { visible: true }
      );
      const actual = await page.evaluate((el) => el.textContent, button);
      expect(actual).toContain("Sign up for free");
    },
    60000
  );
});

test(
  "The h1 on Features page is not empty",
  async () => {
    await page.goto("https://github.com/features");
    await page.waitForSelector("h1");
    const actual = await page.$eval("h1", (el) => el.textContent.trim());
    expect(actual.length).toBeGreaterThan(0);
  },
  60000
);

test(
  "The h1 on Enterprise page is not empty",
  async () => {
    await page.goto("https://github.com/enterprise");
    await page.waitForSelector("h1");
    const actual = await page.$eval("h1", (el) => el.textContent.trim());
    expect(actual.length).toBeGreaterThan(0);
  },
  60000
);

test(
  "The h1 on Pricing page is not empty",
  async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector("h1");
    const actual = await page.$eval("h1", (el) => el.textContent.trim());
    expect(actual.length).toBeGreaterThan(0);
  },
  60000
);