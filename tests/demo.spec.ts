import { test, expect, Locator } from '@playwright/test';

test('Built-in Locators', async ({ page }) => {



  // Go to Amazon homepage
  await page.goto('https://www.amazon.com/');

  // Assert the page title contains 'Amazon'
  await expect(page).toHaveTitle(/Amazon/i);

  // Fill the search input with 'laptop' and assert value
  const searchInput: Locator = page.locator('#twotabsearchtextbox');
  await searchInput.fill('laptop');
  await expect(searchInput).toHaveValue('laptop');

  // Click the search button
  await page.locator('input[type="submit"]').click();

  // Assert that search results are visible (check for 'results' text or product)
  await expect(page.locator('span.a-color-state')).toBeVisible();

  // Wait for 3 seconds at the end of the test
  await page.waitForTimeout(3000);

});