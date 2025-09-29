import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['Galaxy S8 landscape'],
});

test('test', async ({ page }) => {
});