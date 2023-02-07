import { test } from '@playwright/test';

test('test', async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await page.goto('/home');
  await page.goto('/scoreboard');
  await page.goto('/controllers');
  await page.goto('/driverprofile');
  await page.goto('/selectdriver');
});
