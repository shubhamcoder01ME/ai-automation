import { test, expect } from "@playwright/test";

// ======================================================
// Test Case 1: Select All Radio Buttons One by One
// ======================================================

test("Select All Radio Buttons", async ({ page }) => {

    // Navigation Method
    await page.goto("https://demoapps.qspiders.com/ui/radio?sublist=0");

    // Locator Method
    const radioButtons = page.locator("//input[@type='radio']");

    // Count Method
    const count = await radioButtons.count();

    console.log("Total Radio Buttons: " + count);

    for (let i = 0; i < count; i++) {

        // Locator Method
        const radio = radioButtons.nth(i);

        // Validation Method
        const status = await radio.isChecked();

        if (!status) {

            // Radio Button Action
            await radio.check();

            // Assertion Method
            await expect(radio).toBeChecked();

            console.log(`Radio Button ${i + 1} Selected`);
        }
        else {

            console.log(`Radio Button ${i + 1} Already Selected`);
        }
    }
});

// ======================================================
// Test Case 2: Select Specific Radio Button
// ======================================================

test("Write a script to select Radio Button ?", async ({ page }) => {

    // Navigation Method
    await page.goto("https://demoapps.qspiders.com/ui/radio?sublist=0");

    // Locator Method
    const walletRadio = page.locator("//input[@id='attended_a']");

    // Assertion Method
    await expect(walletRadio).toBeEnabled();

    // Radio Button Action
    await walletRadio.check();

    // Assertion Method
    await expect(walletRadio).toBeChecked();

    console.log("Wallet Radio Button Selected");
});

// ======================================================
// Test Case 3: Verify Radio Button Status
// ======================================================

test("Write a script to click on Radio Button ?", async ({ page }) => {

    // Navigation Method
    await page.goto("https://demoapps.qspiders.com/ui/radio?sublist=0");

    // Locator Method
    const walletRadio = page.locator("//input[@id='attended_a']");

    // Assertion Method
    await expect(walletRadio).toBeEnabled();

    // Validation Method
    const status = await walletRadio.isChecked();

    if (status) {

        console.log("Wallet Radio Button Already Selected");
    }
    else {

        console.log("Wallet Radio Button Not Selected");

        // Radio Button Action
        await walletRadio.click();

        // Assertion Method
        await expect(walletRadio).toBeChecked();

        console.log("Wallet Radio Button Selected");
    }
});


// ======================================================
// Test Case 3: Verify Radio Button selceted or not 
// 
test("Write a script to check radio buttons are not selected?", async ({ page }) => {

 // Navigation Method
    await page.goto("https://demoapps.qspiders.com/ui/radio/selected?sublist=1");

    // Locator Method
    const radioButtons = page.locator("//input[@type='radio']");

    // Wait for first radio button
    await radioButtons.first().waitFor();

    // Count Method
    const count = await radioButtons.count();

    console.log("Total Radio Buttons: " + count);

    for (let i = 0; i < count; i++) {

        // Locator Method
        const radio = radioButtons.nth(i);

        // Validation Method
        const status = await radio.isChecked();

        // Get Radio Button ID
        const id = await radio.getAttribute("tesxt");

        if (status) {
            console.log(`${id} is Selected`);
        }
        else {
            console.log(`${id} is Not Selected`);
        }
    }
});