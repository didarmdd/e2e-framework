import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { getSelector } from '../support/locator-helper';
import { routes } from '../constants/routes';

export class DashboardPage extends BasePage {
  readonly header: Locator;
  readonly logout: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator(getSelector('dashboard', 'header'));
    this.logout = page.locator(getSelector('dashboard', 'logout'));
  }

  async goto(): Promise<void> {
    await this.page.goto(routes.dashboard);
  }
}
