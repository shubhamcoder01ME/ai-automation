import { test, expect } from '@playwright/test';

test('Verify iframe exists', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/iframe');

    const frame = page.locator('iframe');

    await expect(frame).toBeVisible();

});



test('Count Frames', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/iframe');

    const frames = page.frames();

    console.log("Total Frames:", frames.length);

    expect(frames.length).toBeGreaterThan(0);

});

test('Access Frame', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/iframe');

    const editor =page.frameLocator('#mce_0_ifr');

    await expect(editor.locator('body')).toBeVisible();

});



test('Read Text From Frame 1', async ({ page }) => {

    await page.goto('https://demoqa.com/frames');

    const frame = page.frameLocator('#frame1');

    const heading = frame.locator('#sampleHeading');

    await expect(heading).toBeVisible();

    const text = await heading.textContent();

    console.log(text);

    expect(text).toContain('This is a sample page');
});



test('Read Text From Frame 2', async ({ page }) => {

    await page.goto('https://demoqa.com/frames');

    const frame = page.frameLocator('#frame2');

    const heading = frame.locator('#sampleHeading');

    await expect(heading).toBeVisible();

    const text = await heading.textContent();

    console.log(text);

    expect(text).toContain('This is a sample page');
});



test('Count Total Frames', async ({ page }) => {

    await page.goto('https://demoqa.com/frames');

    const frames = page.frames();

    console.log("Total Frames:", frames.length);

    expect(frames.length).toBeGreaterThan(2);
});


test('Validate Frame Heading', async ({ page }) => {

    await page.goto('https://demoqa.com/frames');

    const heading = page
        .frameLocator('#frame1')
        .locator('#sampleHeading');

    await expect(heading)
        .toHaveText('This is a sample page');
});



test('Compare Both Frames Text', async ({ page }) => {

    await page.goto('https://demoqa.com/frames');

    const frame1Text = await page
        .frameLocator('#frame1')
        .locator('#sampleHeading')
        .textContent();

    const frame2Text = await page
        .frameLocator('#frame2')
        .locator('#sampleHeading')
        .textContent();

    expect(frame1Text).toBe(frame2Text);
});

test('Handle Frame Using page.frame()', async ({ page }) => {

    await page.goto('https://demoqa.com/frames');

    const frame = page.frame({
        url: /sampleiframe/
    });

    const text = await frame
        .locator('#sampleHeading')
        .textContent();

    console.log(text);

    expect(text).toContain('This is a sample page');
});



test('Print All Frames', async ({ page }) => {

    await page.goto(
        'https://the-internet.herokuapp.com/nested_frames'
    );

    const frames = page.frames();

    console.log("Total Frames:", frames.length);

    for(const frame of frames)
    {
        console.log(frame.name());
    }
});



test('Read Left Frame', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/nested_frames' );

    const leftFrame =page.frame({ name: 'frame-left' });

    const text =await leftFrame.locator('body').textContent();

    console.log(text);

    expect(text.trim()).toBe('LEFT');
});



test('Read Middle Frame', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/nested_frames');

    const middleFrame =page.frame({ name: 'frame-middle' });

    const text =await middleFrame.locator('#content').textContent();

    console.log(text);

    expect(text.trim()).toBe('MIDDLE');
});



test('Switch Multiple Frames', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/nested_frames');

    const leftFrame =page.frame({ name: 'frame-left' });

    const middleFrame =page.frame({ name: 'frame-middle' });

    const rightFrame =page.frame({ name: 'frame-right' });

    const left =await leftFrame.locator('body').textContent();

    const middle =await middleFrame.locator('#content').textContent();

    const right =await rightFrame.locator('body').textContent();

    console.log(left);
    console.log(middle);
    console.log(right);

    expect(left.trim()).toBe('LEFT');
    expect(middle.trim()).toBe('MIDDLE');
    expect(right.trim()).toBe('RIGHT');
});


test('Verify Nested Frames', async ({ page }) => {

    await page.goto(
        'https://the-internet.herokuapp.com/nested_frames'
    );

    const frames = page.frames();

    expect(frames.length).toBeGreaterThan(4);

    for(const frame of frames)
    {
        console.log(
            "Frame Name:",
            frame.name()
        );
    }
});


test('Identify All Frames', async ({ page }) => {

    await page.goto(
        'https://the-internet.herokuapp.com/nested_frames'
    );

    const frames = page.frames();

    for(const frame of frames)
    {
        console.log(
            "Name:",
            frame.name()
        );

        console.log(
            "URL:",
            frame.url()
        );
    }
});



test('Fill Form Inside Frame', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/frames');

    const frame = page.frameLocator('iframe');

    const username =frame.locator('#username');

    const password =frame.locator('#password');

    await expect(username).toBeVisible();

    await username.fill('Shubham');

    await password.fill('Test123');

    await expect(username).toHaveValue('Shubham');

    await expect(password).toHaveValue('Test123');
});



test('Find Frame Dynamically', async ({ page }) => {

    await page.goto('https://demoqa.com/frames');

    const frames = page.frames();

    for(const frame of frames)
    {
        console.log(
            frame.name(),
            frame.url()
        );
    }

    const frame = page.frame({url: /sampleiframe/});

    const text =await frame.locator('#sampleHeading').textContent();

    expect(text).toContain('sample page');
});



test('Verify Parent Frame', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/nested_frames');

    const middleFrame =page.frame({name: 'frame-middle'});

    const parent =middleFrame.parentFrame();

    console.log(parent.name());

    expect(parent.name()).toBe('frame-top');
});