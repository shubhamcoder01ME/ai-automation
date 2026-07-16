import {test,expect} from "@playwright/test";

test("Mouse Hover",async ({page})=>{
    await page.goto("https://demoapps.qspiders.com/ui/mouseHover?sublist=0");
    
    const element=page.locator('img.w-5.h-5.mt-5.ml-3.cursor-pointer');
    await element.hover();

    await expect(page.locator('ul.p-4:visible')).toBeVisible();

})

test("Drag and Drop", async ({ page }) => {

    // Navigation Method
    await page.goto("https://demoapps.qspiders.com/ui/dragDrop/dragToCorrect?sublist=2");

    // Locator Method
    const sourceElement = page.getByText("Mobile Charger", { exact: true });
    const targetElement = page.getByText("Mobile Accessories");

    // Drag and Drop Action
    await sourceElement.dragTo(targetElement);

    console.log("Drag and Drop Successful");
});

test("Double Click Button", async ({ page }) => {

    await page.goto("https://demoqa.com/buttons");

    const doubleClickBtn = page.locator("#doubleClickBtn");

    await doubleClickBtn.dblclick();

    await expect(page.locator("#doubleClickMessage"))
        .toBeVisible();

    console.log("Double Click Successful");
});

test("Right Click Button", async ({ page }) => {

    await page.goto("https://demoqa.com/buttons");

    const rightClickBtn = page.locator("#rightClickBtn");

    await rightClickBtn.click({ button: "right" });

    await expect(page.locator("#rightClickMessage"))
        .toBeVisible();

    console.log("Right Click Successful");
});

