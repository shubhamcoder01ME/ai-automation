import { test, expect } from "@playwright/test";

test("Select Dropdown By Visible Text", async ({ page }) => {

    await page.goto("https://demoapps.qspiders.com/ui/dropdown?sublist=0");

    const singleSelect = page.locator("#select3");

    await singleSelect.selectOption({ label: "Germany" });

    // Assertion Method
    await expect(singleSelect).toHaveValue("Germany");

    console.log("Germany Selected Successfully");


});

test("Select Dropdown By value", async ({ page }) => {

    await page.goto("https://demoapps.qspiders.com/ui/dropdown?sublist=0");

    const singleSelect = page.locator("#select3");

    await singleSelect.selectOption("Germany");

    // Assertion Method
    await expect(singleSelect).toHaveValue("Germany");

    console.log("Germany Selected Successfully");


});

test("Select Dropdown By index", async ({ page }) => {

    await page.goto("https://demoapps.qspiders.com/ui/dropdown?sublist=0");

    const singleSelect = page.locator("#select3");

    // By Index
    await singleSelect.selectOption({ index:4 });

    // Assertion Method
    await expect(singleSelect).toHaveValue("China");

    console.log("Germany Selected Successfully");


});

test("Get All Dropdown Values", async ({ page }) => {

    // Navigation Method
    await page.goto("https://demoapps.qspiders.com/ui/dropdown?sublist=0");
    
    // Locator Method
    const options = page.locator("#select3 option")
    await expect(options.first()).toBeEnabled();
    // Count Method
    const count = await options.count();

    console.log("Total Options: " + count);

    for (let i = 0; i < count; i++) {

        // Get Option Text
        const text = await options.nth(i).textContent();

        console.log(text);
    }
    
    //get all option shortcut metjod 
    const allOptions = await page.locator("#select3 option").allTextContents();

    console.log(allOptions);
});

test("Select one by one All Dropdown Values", async ({ page }) => {

    // Navigation Method
    await page.goto("https://demoapps.qspiders.com/ui/dropdown?sublist=0");

    // Locator Method
    const dropdown = page.locator("#select3");
    const options = page.locator("#select3 option");

    // Assertion Method
    await expect(dropdown).toBeVisible();

    // Count Method
    const count = await options.count();

    console.log("Total Options: " + count);

    // Skip first placeholder option
    for (let i = 1; i < count; i++) {

        // Get Option Text
        const text = await options.nth(i).innerText();

        // Dropdown Action
        await dropdown.selectOption({ label: text });

        console.log(`${text} Selected`);
    }
    });

test("Select All Options In Multi Select Dropdown", async ({ page }) => {

    // Navigation Method
    await page.goto("https://demoapps.qspiders.com/ui/dropdown/multiSelect?sublist=1");

    // Locator Method
    const dropdown = page.locator("#select-multiple-native");
    const options = page.locator("#select-multiple-native option");

    // Assertion Method
    await expect(dropdown).toBeVisible();

    // Count Method
    const count = await options.count();

    console.log("Total Options: " + count);

    // Store all option values
    const values = [];

    for (let i = 0; i < count; i++) {

        const value = await options.nth(i).getAttribute("value");

        values.push(value);
    }

    // Multi Select Action
    await dropdown.selectOption(values);

    console.log("All Options Selected");

    // Print Selected Options
    const selectedOptions =
        await dropdown.locator("option:checked").allTextContents();

    console.log(selectedOptions);
});
test("Search and Select India", async ({ page }) => {

    await page.goto("https://demoapps.qspiders.com/ui/dropdown/search?sublist=2");

    // Click Country Dropdown
    await page.getByText("Select").first().click();

    // Type India
    await page.keyboard.type("India");

    // Select India
    await page.getByText("India", { exact: true }).click();

    console.log("India Selected Successfully");
});