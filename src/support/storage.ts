import { Page } from '@playwright/test';

export const setLocalStorage = async (page: Page, key: string, value: string) => {
  await page.addInitScript(
    ([storageKey, storageValue]) => {
      window.localStorage.setItem(storageKey, storageValue);
    },
    [key, value]
  );
};

export const getLocalStorage = async (page: Page, key: string): Promise<string | null> => {
  return page.evaluate((storageKey) => {
    return window.localStorage.getItem(storageKey);
  }, key);
};
