import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard.page';

test('dashboard loads @smoke @ui', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();
  await expect(dashboard.header).toContainText('Example');
});
