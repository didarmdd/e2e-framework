import { APIRequestContext } from '@playwright/test';
import { buildUser } from './data-builder';

export const seedUser = async (request: APIRequestContext, baseURL: string): Promise<string> => {
  if (!baseURL) {
    throw new Error('baseURL is required to seed a user');
  }

  const response = await request.post(`${baseURL}/users`, {
    data: buildUser(),
  });

  if (!response.ok()) {
    throw new Error(`Failed to seed user: ${response.status()}`);
  }

  const body = (await response.json()) as { id?: string | number };
  return body.id ? String(body.id) : '';
};
