// const { chromium } = require('playwright');

// (async () => {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();

//   // Load the local HTML file (replace with the correct file path)
//   await page.goto('file:///path/to/upload.html');

//   // Select the file input element and set the file path
//   const filePath = '/path/to/your/file.txt'; // Replace with your file path
//   await page.setInputFiles('input[type="file"]', filePath);

//   // Submit the form (optional)
//   await page.click('button[type="submit"]');

//   // Wait for a response or page navigation (if applicable)
//   await page.waitForNavigation();

//   console.log('File uploaded successfully!');
//   await browser.close();
// })();
import { test, expect } from '@playwright/test';

test.only('Verify Upload file', async ({ page }) => {
  // Go to the local HTML file
  await page.goto('file:///F:/Playwright_Course/tests/demo.html');

  // Use the existing de.txt file for upload
  const filePath = 'F:/Playwright_Course/tests/de.txt';

  // Upload the file using the file input
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(filePath);

  // Assert the file input now has a file selected
  const filesCount = await fileInput.evaluate((input: HTMLInputElement) => input.files?.length);
  expect(filesCount).toBe(1);
   await page.screenshot({ path: 'F:/Playwright_Course/tests/download_page.png' });

  // Optionally, submit the form if your HTML has a submit button
  // await page.click('button[type="submit"]');
});


test('Verify file download', async ({ page, context }) => {
  // Go to a page with a download link or button
  await page.goto('https://file-examples.com/index.php/sample-documents-download/sample-txt-file/');

  // Wait for the download event after clicking the download button/link
  const [ download ] = await Promise.all([
    page.waitForEvent('download'),
    page.click('a[href*="file_example_TXT_10kB"]') // Update selector as needed
  ]);

  await page.screenshot({ path: 'F:/Playwright_Course/tests/download_page.png' });

  // Save the downloaded file to a specific path
  const downloadPath = 'F:/Playwright_Course/tests/downloaded.txt';
  await download.saveAs(downloadPath);

  // Assert the file exists
  const fs = require('fs');
  expect(fs.existsSync(downloadPath)).toBeTruthy();
});