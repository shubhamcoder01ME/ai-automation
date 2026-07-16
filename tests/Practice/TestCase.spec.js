import { test, expect } from "@playwright/test";

// Test Case
test("Login Functionality", async ({ page }) => {

    // goto() -> Navigation Method
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    // getByRole() -> Locator Method
    const username = page.getByRole('textbox', {
        name: 'email@example.com'
    });

    // getByRole() -> Locator Method
    const password = page.getByRole('textbox', {
        name: 'enter your passsword'
    });

    // locator() -> Locator Method
    const login = page.locator('#login');

    // fill() -> Input Field Action
    await username.fill("kumarshubham8689@gmail.com");

    // fill() -> Input Field Action
    await password.fill("ShubhamShubham123@");

    // click() -> Button Action
    await login.click();

    // toHaveURL() -> Assertion
    await expect(page).toHaveURL(/dashboard/);

});



test("Get All Product Names", async ({ page }) => {

    // Navigation Method
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    // Locator Method
    const username = page.getByRole('textbox', {
        name: 'email@example.com'
    });

    // Locator Method
    const password = page.getByRole('textbox', {
        name: 'enter your passsword'
    });

    // fill() -> Input Field Action
    await username.fill("kumarshubham8689@gmail.com");

    // fill() -> Input Field Action
    await password.fill("ShubhamShubham123@");

    // Button Action
    await page.locator('#login').click();
    // Assertion
    await expect(page).toHaveURL(/dashboard/);
    // Locator Method
    const products = page.locator(".card-body b");

    // Get all product names
    const productNames = await products.allTextContents();

    // Print all product names
    console.log(productNames);

});