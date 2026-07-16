import { test, expect } from "@playwright/test";

test("Type Text Using Keyboard", async ({ page }) => {

    // Navigation Method
    await page.goto("https://demoapps.qspiders.com/ui/keyboard?sublist=0");

    // Locator Method
    const inputField = page.locator('[name="handleInput"]');
    const verifyText = page.locator("//span[@class='font-bold']");

    // Click inside input field
    await inputField.click();

    // Keyboard Action
    await page.keyboard.type("Shubham Kumar");

    // Assertion Method
    await expect(verifyText).toHaveText("r");

    console.log("Text Typed Successfully");
});



test('Backspace', async ({ page }) => {

    await page.goto('https://demoqa.com/text-box');

    const userName = page.locator('#userName');

    await userName.click();

    await page.keyboard.type('Shubham');

    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');

    await expect(userName).toHaveValue('Shubh');
});

test('Ctrl+A and Delete', async ({ page }) => {

    await page.goto('https://demoqa.com/text-box');

    const userName = page.locator('#userName');

    await userName.fill('Shubham Kumar');

    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');

    await expect(userName).toHaveValue('');
});

test('Tab Navigation', async ({ page }) => {

    await page.goto('https://demoqa.com/text-box');

    await page.locator('#userName').click();

    await page.keyboard.type('Shubham');

    await page.keyboard.press('Tab');

    await page.keyboard.type('shubham@test.com');

    await expect(page.locator('#userEmail'))
        .toHaveValue('shubham@test.com');
});

test('Shift Key', async ({ page }) => {

    await page.goto('https://demoqa.com/text-box');

    const userName = page.locator('#userName');

    await userName.click();

    await page.keyboard.down('Shift');

    await page.keyboard.type('playwright');

    await page.keyboard.up('Shift');

    await expect(userName)
        .toHaveValue('PLAYWRIGHT');
});

test('Arrow Up and Down', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/inputs');

    const input = page.locator('input');

    await input.click();

    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');

    await expect(input).toHaveValue('2');

    await page.keyboard.press('ArrowDown');

    await expect(input).toHaveValue('1');
});

test('Enter Key', async ({ page }) => {

    await page.goto('https://www.google.com');

    await page.locator('textarea[name="q"]')
        .fill('Playwright');

    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/search/);
});

test('Copy and Paste', async ({ page }) => {

    await page.goto('https://demoqa.com/text-box');

    const userName = page.locator('#userName');
    const email = page.locator('#userEmail');

    await userName.click();

    await page.keyboard.type('Shubham Kumar');

    await page.keyboard.press('Control+A');
    await page.keyboard.press('Control+C');

    await page.keyboard.press('Tab');

    await page.keyboard.press('Control+V');

    await expect(email)
        .toHaveValue('Shubham Kumar');
});