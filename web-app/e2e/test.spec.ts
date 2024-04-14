import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('test', async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await page.goto('/home');

  // Ensure API is accessible
  expect(await page.textContent('.d-flex')).toContain('SimRig API is active');

  await page.goto('/scoreboard');
  await page.goto('/controllers');
  await page.goto('/driverprofile');
  await page.goto('/selectdriver');
});
