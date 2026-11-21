describe('API Demos application', () => {

    it('should enter Ukraine in the Auto Complete field', async () => {

        // 1. Verify that the application is launched
        const currentPackage = await driver.getCurrentPackage();
        console.log('Current application package:', currentPackage);
        expect(currentPackage).toBe('io.appium.android.apis');

        // 2. Navigate to Views
        const views = await $('~Views');
        await views.waitForDisplayed();
        await views.click();

        // 3. Navigate to Auto Complete
        const autoComplete = await $('~Auto Complete');
        await autoComplete.waitForDisplayed();
        await autoComplete.click();

        // 4. Open Screen Top
        const screenTop = await $('~1. Screen Top');
        await screenTop.waitForDisplayed();
        await screenTop.click();

        // 5. Locate the Country field using Resource ID
        const countryField = await $('android=new UiSelector().resourceId("io.appium.android.apis:id/edit")');
        await countryField.waitForDisplayed();

        // 6. Verify the field using additional locator strategies

        // UiAutomator locator
        const fieldByUiAutomator = await $('android=new UiSelector().className("android.widget.AutoCompleteTextView")');

        // XPath locator
        const fieldByXPath = await $('//android.widget.AutoCompleteTextView[@resource-id="io.appium.android.apis:id/edit"]');
        expect(await fieldByUiAutomator.isDisplayed()).toBe(true);
        expect(await fieldByXPath.isDisplayed()).toBe(true);

        // 7. Enter the country name
        await countryField.setValue('Ukraine');

        // 8. Verify the entered value
        const enteredValue = await countryField.getText();
        expect(enteredValue).toBe('Ukraine');
        console.log('Entered country:', enteredValue);

    });

    it('should interact with the Add button in LogTextBox', async () => {

        // 1. Restart the application
        await driver.terminateApp('io.appium.android.apis');
        await driver.activateApp('io.appium.android.apis');

        // 2. Open Text
        const textSection = await $('~Text');
        await textSection.waitForDisplayed();
        await textSection.click();

        // 3. Open LogTextBox
        const logTextBox = await $('~LogTextBox');
        await logTextBox.waitForDisplayed();
        await logTextBox.click();

        // 4. Locate the Add button
        const addButton = await $('~Add');
        await addButton.waitForDisplayed();

        // 5. Get the screen hierarchy before clicking
        const sourceBefore = await driver.getPageSource();

        // 6. Click the Add button
        await addButton.click();
        await driver.pause(1000);

        // 7. Get the screen hierarchy after clicking
        const sourceAfter = await driver.getPageSource();
        console.log('Screen before clicking Add:', sourceBefore);
        console.log('Screen after clicking Add:', sourceAfter);

        // 8. Verify that the screen content has changed
        expect(sourceAfter).not.toBe(sourceBefore);

    });

    it('should interact with the Bouncing Balls animation', async () => {

        // 1. Restart the application
        await driver.terminateApp('io.appium.android.apis');
        await driver.activateApp('io.appium.android.apis');

        // 2. Open Animation
        const animationSection = await $('~Animation');
        await animationSection.waitForDisplayed();
        await animationSection.click();

        // 3. Open Bouncing Balls
        const bouncingBalls = await $('~Bouncing Balls');
        await bouncingBalls.waitForDisplayed();
        await bouncingBalls.click();

        // 4. Wait for the animation screen
        await driver.pause(2000);

        // 5. Get screen dimensions
        const windowSize = await driver.getWindowSize();
        const centerX = Math.floor(windowSize.width / 2);
        const centerY = Math.floor(windowSize.height / 2);

        // 6. Tap the animation area
        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: centerX, y: centerY },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 200 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        // 7. Wait to observe the animation
        await driver.pause(3000);

        // 8. Verify that the animation screen is opened
        const pageSource = await driver.getPageSource();
        expect(pageSource).toContain('Bouncing Balls');

    });

});