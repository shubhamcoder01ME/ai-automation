import { test, expect } from '@playwright/test';

test('Auto Waiting Example', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page.locator('#finish')).toHaveText('Hello World!');
});


test('waitForSelector Example', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.getByRole('button', { name: 'Start' }).click();

    await page.waitForSelector('#finish');

    await expect(page.locator('#finish')).toHaveText('Hello World!');
});


test('locator waitFor Example', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.getByRole('button', { name: 'Start' }).click();

    await page.locator('#finish').waitFor({ state: 'visible' });

    await expect(page.locator('#finish')).toContainText('Hello World!');
});



test('waitForURL Example', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');

    await page.locator('#password').fill('secret_sauce');

    await page.locator('#login-button').click();

    await page.waitForURL('**/inventory.html');

    await expect(page).toHaveURL(/inventory/);
});


test('waitForLoadState Example', async ({ page }) => {

    await page.goto('https://demoqa.com/');

    await page.waitForLoadState('load');

    await expect(page).toHaveTitle(/demosite/);
});



test('waitForTimeout Example', async ({ page }) => {

    await page.goto('https://demoqa.com/');

    await page.waitForTimeout(3000);

});


test('waitForLoadState domcontentloaded', async ({ page }) => {

    await page.goto('https://demoqa.com/');

    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveURL(/demoqa/);
});



test('waitForLoadState networkidle', async ({ page }) => {

    await page.goto('https://demoqa.com/');

    await page.waitForLoadState('networkidle');

    await expect(page.locator('body')).toBeVisible();
});


test('waitFor hidden state', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    await page.getByRole('button', { name: 'Start' }).click();

    await page.locator('#loading').waitFor({ state: 'hidden' });

    await expect(page.locator('#finish')).toBeVisible();
});


test('waitFor attached state', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.getByRole('button', { name: 'Start' }).click();

    await page.locator('#finish').waitFor({ state: 'attached' });

    await expect(page.locator('#finish')).toBeAttached();
});


test('waitFor detached state', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    await page.getByRole('button', { name: 'Start' }).click();

    await page.locator('#loading').waitFor({ state: 'detached' });

});



test('Custom Timeout', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.getByRole('button', { name: 'Start' }).click();

    await page.waitForSelector('#finish', {timeout: 10000 });

    await expect(page.locator('#finish')).toHaveText('Hello World!');
});