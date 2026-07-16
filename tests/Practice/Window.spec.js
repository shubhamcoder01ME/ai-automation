import { test, expect } from '@playwright/test';

test('Open New Tab', async ({ page }) => {

    await page.goto(
        'https://the-internet.herokuapp.com/windows'
    );

    const [newPage] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByText('Click Here').click()

    ]);

    await expect(newPage).toHaveURL('https://the-internet.herokuapp.com/windows/new');

    console.log(await newPage.title());
});



test('Verify Child Window Text', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    const [childPage] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByRole('link', {name: 'Click Here'}).click()

    ]);

    const text =await childPage.locator('h3').textContent();

    console.log(text);

    expect(text).toBe('New Window');

});



test('Parent Child URL Validation', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    const parentUrl = page.url();

    const [childPage] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByText('Click Here').click()

    ]);

    console.log("Parent:", parentUrl);

    console.log("Child:",childPage.url());

    expect(parentUrl).toContain('/windows');

    expect(childPage.url()).toContain('/windows/new');
});



test('Close Child Window', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    const [childPage] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByText('Click Here').click()

    ]);


    await childPage.close();

    await expect(page).toHaveURL('https://the-internet.herokuapp.com/windows');
});



test('Count Open Tabs', async ({ page, context }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    const [childPage] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByRole('link', { name: 'Click Here' }).click()

    ]);

    const pages = context.pages();

    console.log("Total Pages:", pages.length);

    expect(pages.length).toBe(2);
});



test('Print All Page URLs', async ({ page, context }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    await Promise.all([

        page.waitForEvent('popup'),

        page.getByRole('link', { name: 'Click Here' }).click()

    ]);

    const pages = context.pages();

    for (const p of pages) {

        console.log(await p.url());

    }
});



test('Find Child Page Dynamically', async ({ page, context }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    await Promise.all([

        page.waitForEvent('popup'),

        page.getByRole('link', { name: 'Click Here' }).click()

    ]);

    const pages = context.pages();

    let child;

    for (const p of pages) {

        if (p.url().includes('/windows/new')) {

            child = p;
            break;
        }
    }

    await expect(child.locator('h3')).toHaveText('New Window');
});



test('Switch Between Tabs', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    const [childPage] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByRole('link', { name: 'Click Here' }).click()

    ]);

    await expect(childPage.locator('h3')).toHaveText('New Window');

    await expect(page.locator('h3')).toHaveText('Opening a new window');
});



test('Handle Multiple Child Windows', async ({ page, context }) => {

    await page.goto('https://demo.automationtesting.in/Windows.html');

    const [child] = await Promise.all([

        page.waitForEvent('popup'),

        page.locator('button').click()

    ]);

    const pages = context.pages();

    console.log("Total Windows:", pages.length);

    expect(pages.length).toBeGreaterThan(1);

    for (const p of pages) {
        console.log(await p.title());
    }
});



test('Switch Window By Title', async ({ page, context }) => {

    await page.goto('https://demo.automationtesting.in/Windows.html');

    await Promise.all([
        page.waitForEvent('popup'),
        page.locator('button').click()
    ]);

    const pages = context.pages();

    for (const p of pages) {

        const title = await p.title();

        if (title.includes('Selenium')) {

            await expect(p).toHaveTitle(/Selenium/);

            console.log(title);
        }
    }
});



test('Close All Child Windows', async ({ page, context }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    const [child] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByText('Click Here').click()

    ]);

    const pages = context.pages();

    for (const p of pages) {

        if (p !== page) {

            await p.close();

        }
    }

    expect(context.pages().length).toBe(1);
});




test('Find Window By URL', async ({ page, context }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    await Promise.all([

        page.waitForEvent('popup'),

        page.getByText('Click Here').click()

    ]);

    const pages = context.pages();

    for (const p of pages) {

        if ((await p.url()).includes('/windows/new')) {

            await expect(p.locator('h3'))
                .toHaveText('New Window');
        }
    }
});



test('Child Action Then Parent Validation', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    const [child] = await Promise.all([

        page.waitForEvent('popup'),
        page.getByText('Click Here').click()

    ]);

    await expect(child.locator('h3')).toHaveText('New Window');

    await child.close();

    await expect(page.locator('h3')) .toHaveText('Opening a new window');
});


test('Real Project - Login Popup Scenario', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    const [loginPopup] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByRole('link', { name: 'Click Here' }).click()

    ]);

    await expect(loginPopup.locator('h3')).toHaveText('New Window');

    console.log("Popup URL:", loginPopup.url());

    console.log("Popup Title:", await loginPopup.title());

    await loginPopup.close();

    await expect(page.locator('h3')).toHaveText('Opening a new window');

    console.log("Returned to Parent Window");
});



test('Open New Window Using Context', async ({ page, context }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    const [newPage] = await Promise.all([

        context.waitForEvent('page'),

        page.getByRole('link', {
            name: 'Click Here'
        }).click()

    ]);

    await expect(newPage.locator('h3'))
        .toHaveText('New Window');
});



test('Open Popup Using Page Event', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    const [popup] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByRole('link', {
            name: 'Click Here'
        }).click()

    ]);

    await expect(popup.locator('h3'))
        .toHaveText('New Window');
});