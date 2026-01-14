import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { getSelector } from '../support/locator-helper';

export class LoginPage extends BasePage {
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    super(page);
    this.email = page.locator(getSelector('login', 'email'));
    this.password = page.locator(getSelector('login', 'password'));
    this.submit = page.locator(getSelector('login', 'submit'));
  }

  async login(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}
