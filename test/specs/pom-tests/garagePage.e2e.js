describe('Garage Page', () => {
    it('Add a car', async () => {
        const addCarModelDropdown = await $('#addCarModel');

        await SignInForm.setEmail(process.env.USER_EMAIL);
        await SignInForm.setPassword(process.env.USER_PASSWORD);
        await SignInForm.clickSubmitButton();
        await $('.panel-page').waitForDisplayed();
        await expect(await browser.getUrl()).toEqual(
            'https://' +
                process.env.CREDENTIALS +
                'qauto.forstudy.space/panel/garage',
        );

        await $('.btn-primary').click();

        await $('#addCarBrand option[value="1: 2"]').waitForExist();
        await $('#addCarBrand').selectByVisibleText('BMW');

        await browser.pause(500);
        // await $('#addCarModel').selectByVisibleText('X5');
        await addCarModelDropdown.selectByIndex(2);

        const selectedText = await addCarModelDropdown
            .$('option:checked')
            .getText();

        // await expect(await $('#addCarModel')).toHaveValue('X5');
        await expect(selectedText).toBe('X5');
        await $('#addCarMileage').setValue(50);
        await $('.modal-footer .btn-primary').click();
        await expect(await $('.car_name')).toHaveText('BMW X5');
    });
});
