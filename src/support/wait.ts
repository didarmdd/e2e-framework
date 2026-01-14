import { Page, Response } from '@playwright/test';

export const waitForOkResponse = async (page: Page, urlPart: string): Promise<Response> => {
  const response = await page.waitForResponse((resp) => {
    return resp.url().includes(urlPart) && resp.ok();
  });

  return response;
};
