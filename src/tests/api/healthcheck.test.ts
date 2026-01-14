import { test, expect } from '@playwright/test';

test('list users returns data @smoke @api', async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}/users?page=2`);
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.data.length).toBeGreaterThan(0);
});
