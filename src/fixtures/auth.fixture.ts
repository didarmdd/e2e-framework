import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { routes } from '../constants/routes';

type AuthFixtures = {
  authPage: LoginPage;
};

export const test = base.extend<AuthFixtures>({
  authPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto(routes.login);
    await use(loginPage);
  },
});

export { expect };
