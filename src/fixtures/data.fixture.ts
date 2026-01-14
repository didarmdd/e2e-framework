import { test as base } from '@playwright/test';
import { seedUser } from '../support/api-client';

type DataFixtures = {
  seededUserId: string;
};

export const test = base.extend<DataFixtures>({
  seededUserId: async ({ request, baseURL }, use) => {
    const userId = await seedUser(request, baseURL || '');
    await use(userId);
  },
});
