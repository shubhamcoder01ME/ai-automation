const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

let browser;
let page;

Given('I open the browser', async function () {
  browser = await chromium.launch({ headless: false }); // Launch browser in visible mode
  page = await browser.newPage();
});

When('I navigate to {string}', async function (url) {
  await page.goto(url); // Navigate to the given URL
});

Then('the page title should contain {string}', async function (expectedTitle) {
  const title = await page.title();
  expect(title).toContain(expectedTitle); // Check the title
  await browser.close(); // Close browser
});
