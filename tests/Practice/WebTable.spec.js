import { test, expect } from '@playwright/test';

test('Validate Product Name', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table');

    const product = page.locator("//th[text()='Levis Shirt']");

    await expect(product).toBeVisible();
    await expect(product).toHaveText('Levis Shirt');
});

test('Validate Rating', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table');

    const rating = page.locator("//td[text()='3.5 Star']");

    await expect(rating).toBeVisible();
    await expect(rating).toHaveText('3.5 Star');
});

test('Validate Quantity', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table');

    const quantity = page.locator("//td[text()='2']");

    await expect(quantity).toBeVisible();
    await expect(quantity).toHaveText('2');
});


test('Validate Price', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table');

    const price = page.locator("//td[text()='896']");

    await expect(price).toBeVisible();
    await expect(price).toHaveText('896');
});


test('Row Count', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table');

    const rows = page.locator('tbody tr');

    await expect(rows.first()).toBeVisible();

    const rowCount = await rows.count();

    console.log("Total Rows =", rowCount);

    expect(rowCount).toBeGreaterThan(0);
});


test('Column Count', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table');

    const columns = page.locator('thead tr th');

    await expect(columns.first()).toBeVisible();

    const columnCount = await columns.count();

    console.log("Total Columns =", columnCount);

    expect(columnCount).toBe(5);
});



test('Print Headers', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table');

    const headers = page.locator('thead tr th');

    await expect(headers.first()).toBeVisible();

    const count = await headers.count();

    for(let i=0; i<count; i++)
    {
        console.log(await headers.nth(i).textContent());
    }
});



test('Print Complete Row', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table');

    const row = page.locator('tbody tr').first();

    await expect(row).toBeVisible();

    console.log(await row.textContent());
});



test('Validate Complete Row', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table');

    const row = page.locator('tbody tr').first();

    await expect(row).toBeVisible();

    await expect(row).toContainText('Levis Shirt');
    await expect(row).toContainText('3.5 Star');
    await expect(row).toContainText('23%');
    await expect(row).toContainText('896');
});



test('Print All Rows', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table');

    const rows = page.locator('tbody tr');

    await expect(rows.first()).toBeVisible();

    const count = await rows.count();

    for(let i=0; i<count; i++)
    {
        console.log(await rows.nth(i).textContent());
    }

    expect(count).toBeGreaterThan(0);
});

//dynamic table 
test('Print Product Names', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/dynamicTable');

    const products = page.locator('tbody tr th');

    await expect(products.first()).toBeVisible();

    const count = await products.count();

    for(let i=0;i<count;i++)
    {
        console.log(await products.nth(i).textContent());
    }
});

test('Print All Prices', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/dynamicTable');

    const rows = page.locator('tbody tr');

    await expect(rows.first()).toBeVisible();

    const count = await rows.count();

    for(let i=0;i<count;i++)
    {
        const price =
        await rows.nth(i).locator('td').nth(3).textContent();

        console.log(price);
    }
});

test('Find Samsung Galaxy', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/dynamicTable');

    const rows = page.locator('tbody tr');

    await expect(rows.first()).toBeVisible();

    const count = await rows.count();

    let found = false;

    for(let i=0;i<count;i++)
    {
        const rowText = await rows.nth(i).textContent();

        if(rowText.includes('Samsung Galaxy'))
        {
            found = true;
            console.log(rowText);
            break;
        }
    }

    expect(found).toBeTruthy();
});

test('Get Samsung Galaxy Price', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/dynamicTable');

    const rows = page.locator('tbody tr');

    await expect(rows.first()).toBeVisible();

    const count = await rows.count();

    for(let i=0;i<count;i++)
    {
        const row = rows.nth(i);

        const product =await row.locator('th').textContent();

        if(product.includes('Samsung Galaxy'))
        {
            const price =await row.locator('td').nth(3).textContent();

            console.log("Price =", price);

            break;
        }
    }
});

test('Edit Samsung Galaxy', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/dynamicTable');

    const rows = page.locator('tbody tr');

    await expect(rows.first()).toBeVisible();

    const count = await rows.count();

    for(let i=0;i<count;i++)
    {
        const row = rows.nth(i);

        const product =
        await row.locator('th').textContent();

        if(product.includes('Samsung Galaxy'))
        {
            await row.locator('svg').first().click();
            break;
        }
    }
});

//sorting


test('Click Price Header', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tableSort');

    const headers = page.locator('thead th');

    await expect(headers.first()).toBeVisible();

    const priceHeader = headers.nth(4);

    await priceHeader.click();

    console.log("Price Header Clicked");
});

test('Print All Prices After Sort', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tableSort');

    const headers = page.locator('thead th');

    await expect(headers.first()).toBeVisible();

    // Click Price Header
    await headers.nth(4).click();

    const rows = page.locator('tbody tr');

    await expect(rows.first()).toBeVisible();

    const count = await rows.count();

    console.log("Total Rows =", count);

    for(let i=0; i<count; i++)
    {
        const price =
        await rows.nth(i).locator('td').nth(3).textContent();

        console.log(price);
    }
});



test('Store Prices In Array', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tableSort');

    const headers = page.locator('thead th');

    await expect(headers.first()).toBeVisible();

    await headers.nth(4).click();

    const rows = page.locator('tbody tr');

    const count = await rows.count();

    let prices = [];

    for(let i=0; i<count; i++)
    {
        const price = Number(
            await rows.nth(i).locator('td').nth(3).textContent()
        );

        prices.push(price);
    }

    console.log(prices);
});



test('Verify Price Ascending Sort', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tableSort');

    const headers = page.locator('thead th');

    await expect(headers.first()).toBeVisible();

    // Click Price Header
    await headers.nth(4).click();

    const rows = page.locator('tbody tr');

    await expect(rows.first()).toBeVisible();

    const count = await rows.count();

    let actualPrices = [];

    for(let i=0; i<count; i++)
    {
        const price = Number(
            await rows.nth(i).locator('td').nth(3).textContent()
        );

        actualPrices.push(price);
    }

    console.log("Actual :", actualPrices);

    let expectedPrices = [...actualPrices];

    expectedPrices.sort((a,b)=>a-b);

    console.log("Expected :", expectedPrices);

    expect(actualPrices).toEqual(expectedPrices);
});

//pagination

test('Click Page 2', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tablePagination');

    const page2 = page.locator('ul li').nth(1);

    await expect(page2).toBeVisible();

    await page2.click();

});

test('Verify Pagination', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tablePagination');

    const pages = page.locator('ul li');

    await expect(pages.first()).toBeVisible();

    const count = await pages.count();

    console.log("Total Pages =", count);

    expect(count).toBeGreaterThan(0);

});


test('Print Page Numbers', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tablePagination');

    const pages = page.locator('ul li');

    await expect(pages.first()).toBeVisible();

    const count = await pages.count();

    for(let i=0;i<count;i++)
    {
        console.log(await pages.nth(i).textContent());
    }
});



test('Visit All Pages', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tablePagination');

    const pages = page.locator('ul li');

    await expect(pages.first()).toBeVisible();

    const count = await pages.count();

    for(let i=0;i<count;i++)
    {
        await pages.nth(i).click();

        console.log(
            "Clicked Page:",
            await pages.nth(i).textContent()
        );
    }
});

test('Find Motorola', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tablePagination');

    const pages = page.locator('ul li');

    const pageCount = await pages.count();

    let found = false;

    for(let i=0;i<pageCount;i++)
    {
        await pages.nth(i).click();

        const rows = page.locator('tbody tr');

        const rowCount = await rows.count();

        for(let j=0;j<rowCount;j++)
        {
            const rowText =
            await rows.nth(j).textContent();

            if(rowText.includes('Motorola'))
            {
                console.log(
                    `Found on Page ${i+1}`
                );

                found = true;
                break;
            }
        }

        if(found)
        {
            break;
        }
    }

    expect(found).toBeTruthy();
});

//checkbox
test('Check First Checkbox', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tableWithCheck');

    const checkbox = page.locator('input[type="checkbox"]').first();

    await expect(checkbox).toBeVisible();

    await checkbox.check();

    await expect(checkbox).toBeChecked();

});

test('Verify All Checked', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tableWithCheck');

    const checkboxes = page.locator('input[type="checkbox"]');

    await expect(checkboxes.first()).toBeVisible();

    const count = await checkboxes.count();

    for(let i=0;i<count;i++)
    {
        await checkboxes.nth(i).check();

        await expect(
            checkboxes.nth(i)
        ).toBeChecked();
    }

});



test('Check All Checkboxes', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tableWithCheck');

    const checkboxes = page.locator('input[type="checkbox"]');

    await expect(checkboxes.first()).toBeVisible();

    const count = await checkboxes.count();

    for(let i=0;i<count;i++)
    {
        await checkboxes.nth(i).check();
    }

});



test('Select Samsung Galaxy', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tableWithCheck');

    const rows = page.locator('tbody tr');

    await expect(rows.first()).toBeVisible();

    const count = await rows.count();

    for(let i=0;i<count;i++)
    {
        const row = rows.nth(i);

        const text = await row.textContent();

        if(text.includes('SAMSUNG Galaxy'))
        {
            const checkbox =
            row.locator('input[type="checkbox"]');

            await checkbox.check();

            await expect(checkbox)
                .toBeChecked();

            break;
        }
    }
});



test('Select Highest Price Product', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/table/tableWithCheck');

    const rows = page.locator('tbody tr');

    await expect(rows.first()).toBeVisible();

    const count = await rows.count();

    let highestPrice = 0;
    let highestRow = null;

    for(let i=0;i<count;i++)
    {
        const row = rows.nth(i);

        const price = Number(
            await row.locator('td').nth(4).textContent()
        );

        if(price > highestPrice)
        {
            highestPrice = price;
            highestRow = row;
        }
    }

    const checkbox =
        highestRow.locator('input[type="checkbox"]');

    await checkbox.check();

    await expect(checkbox)
        .toBeChecked();

    console.log("Highest Price =", highestPrice);
});