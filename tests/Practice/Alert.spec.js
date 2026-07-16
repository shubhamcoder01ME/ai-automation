import { test, expect } from '@playwright/test';

test('Handle JS Alert', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        console.log("Alert Text:", dialog.message());

        await dialog.accept();
    });

    await page.locator('button').first().click();

    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});



test('Confirm Alert OK', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        console.log(dialog.message());

        await dialog.accept();
    });

    await page.getByText('Click for JS Confirm').click();

    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
});



test('Confirm Alert Cancel', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        await dialog.dismiss();
    });

    await page.getByText('Click for JS Confirm').click();

    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
});



test('Prompt Alert', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        await dialog.accept('Shubham');
    });

    await page.getByText('Click for JS Prompt').click();

    await expect(page.locator('#result')) .toContainText('Shubham');
});



test('Print Alert Details', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        console.log("Type:", dialog.type());

        console.log("Message:", dialog.message());

        await dialog.accept();
    });

    await page.locator('button').first().click();
});

test('Alert using waitForEvent', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    const dialogPromise = page.waitForEvent('dialog');

    await page.locator('button').first().click();

    const dialog = await dialogPromise;

    console.log(dialog.message());

    await dialog.accept();
});

test('Validate Alert Type', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        expect(dialog.type()).toBe('alert');

        await dialog.accept();
    });

    await page.locator('button').first().click();
});



test('Validate Alert Types', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        console.log("Type:", dialog.type());

        expect(dialog.type()).toBe('alert');

        await dialog.accept();
    });

    await page.locator('button').first().click();

    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});



test('Validate Prompt Default Value', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        console.log( "Default Value:",dialog.defaultValue());

        expect(dialog.type()).toBe('prompt');

        await dialog.accept('Shubham Kumar');
    });

    await page.getByText('Click for JS Prompt').click();

    await expect(page.locator('#result')).toContainText('Shubham Kumar');
});





test('Delete User Confirmation', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        console.log( "Confirmation Message:",dialog.message());

        expect(dialog.message()).toContain('I am a JS Confirm');

        await dialog.accept();
    });

    await page.getByText('Click for JS Confirm').click();

    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
});