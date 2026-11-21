const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

// для капчи, ее не видно целиком
test.use({
  viewport: null,
  launchOptions: { args: ["--window-size=1100,800"] },
});

test("Успешная авторизация", async ({ page }) => {
  // время, чтобы пройти капчу руками
  test.setTimeout(120000);

  await page.goto("https://netology.ru/?modal=sign_in");
  await page.click("text=Другие способы входа");
  await page.click("text=Войти по почте");
  await page.fill('input[type="email"], input[name="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('[data-testid="login-submit-btn"]');

  await expect(page).toHaveURL(/netology\.ru\/profile/, { timeout: 90000 });
  await expect(page.locator('[aria-level="2"]')).toContainText(
    "Здравствуйте",
    { timeout: 30000 }
  );
});

test("Неуспешная авторизация", async ({ page }) => {
  // время, чтобы пройти капчу руками
  test.setTimeout(120000);

  await page.goto("https://netology.ru/?modal=sign_in");
  await page.click("text=Другие способы входа");
  await page.click("text=Войти по почте");
  await page.fill('input[type="email"], input[name="email"]', "test@test.com");
  await page.fill('input[type="password"]', "123456");
  await page.click('[data-testid="login-submit-btn"]');

  await expect(page.locator("text=Вы ввели неправильно логин или пароль.")).toBeVisible({
    timeout: 90000,
  });
});