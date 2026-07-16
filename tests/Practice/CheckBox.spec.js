import { expect, test } from "@playwright/test";

//Write a script to select all Checkbox ?
test("select all checkboxes", async ({ page }) => {

    // Navigation Method
    await page.goto("https://demoapps.qspiders.com/ui/checkbox?sublist=0");

    // Locator Method
    const checkboxes = page.locator("//input[@type='checkbox']");

    // Assertion Method
    await expect(checkboxes.first()).toBeVisible();

    // Get total count
    const count = await checkboxes.count();

    console.log("Total Checkboxes:", count);
 

    for (let i = 0; i < count; i++) {

        // Locator Method
        const checkbox = checkboxes.nth(i);

        // Checkbox Action
        await checkbox.check();

        console.log(`Checkbox ${i + 1} Checked`);
    }


    //

});



//Write a script to deselect all selected Checkbox ?


test("deselect all checkboxes", async ({ page }) => {

    // Navigation Method
    await page.goto("https://demoapps.qspiders.com/ui/checkbox/selected?sublist=1");

    // Locator Method
    const checkboxes = page.locator("//input[@type='checkbox']");

    // Assertion Method
    await expect(checkboxes.first()).toBeVisible();

    // Count Method
    const count = await checkboxes.count();

    console.log("Total Checkboxes:", count);

    for (let i = 0; i < count; i++) {

        // Locator Method
        const checkbox = checkboxes.nth(i);

        // Checkbox Validation
        if (await checkbox.isChecked()) {

            // Checkbox Action
            await checkbox.uncheck();

            // Assertion Method
            await expect(checkbox).not.toBeChecked();

            console.log(`Checkbox ${i + 1} Unchecked`);
        }
        else {

            console.log(`Checkbox ${i + 1} Already Unchecked`);
        }
    }

});