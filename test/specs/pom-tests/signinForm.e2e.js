// import { expect, browser, $ } from '@wdio/globals';

import HomePage from '#pages/HomePage.js';

describe('Form validation - incorrect data', () => {
    beforeEach('Login', async () => {
        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );
        await HomePage.openSigninForm();
    });

    it('Email field - email is empty', async () => {
        const emailField = await $('#signinEmail');
        const emailErrorMessage = await $(
            'form>div:nth-child(1) .invalid-feedback',
        );
        const emailLabel = await $('label[for="signinEmail"]');

        await emailField.setValue('');
        await emailLabel.click();
        await expect(emailErrorMessage).toHaveText('Email required');
    });

    it('Password field - password is empty', async () => {
        const passwordField = await $('#signinPassword');
        const passwordErrorMessage = await $(
            'form>div:nth-child(2) .invalid-feedback',
        );
        const passwordLabel = await $('label[for="signinPassword"]');

        await passwordField.setValue('');
        await passwordLabel.click();
        await expect(passwordErrorMessage).toHaveText('Password required');
    });

    it('Email field - incorrect format', async () => {
        const emailField = await $('#signinEmail');
        const emailErrorMessage = await $(
            'form>div:nth-child(1) .invalid-feedback',
        );
        const emailLabel = await $('label[for="signinEmail"]');

        await emailField.setValue('testuser');
        await emailLabel.click();
        await expect(emailErrorMessage).toHaveText('Email is incorrect');
    });

    it('Email and Password fields - incorrect data', async () => {
        const emailField = await $('#signinEmail');
        const passwordField = await $('#signinPassword');
        const submitButton = await $('.modal-content .btn-primary');
        const errorMessage = await $('.alert-danger');

        await emailField.setValue('testuser@gmail.com');
        await passwordField.setValue('testpassword');
        await submitButton.click();
        await expect(errorMessage).toHaveText('Wrong email or password');
    });
});

describe('Form validation - correct data', () => {
    it('Email and Password fields - incorrect data', async () => {
        const emailField = await $('#signinEmail');
        const passwordField = await $('#signinPassword');
        const submitButton = await $('.modal-content .btn-primary');

        await emailField.setValue(process.env.USER_EMAIL);
        await passwordField.setValue(process.env.USER_PASSWORD);
        await submitButton.click();
        await $('.panel-page').waitForDisplayed();
        await expect(await browser.getUrl()).toEqual(
            'https://' +
                process.env.CREDENTIALS +
                'qauto.forstudy.space/panel/garage',
        );
    });
});

describe.skip('Garage Page', () => {
    it('Add a car', async () => {
        const emailField = await $('#signinEmail');
        const passwordField = await $('#signinPassword');
        const submitButton = await $('.modal-content .btn-primary');

        const addCarModelDropdown = await $('#addCarModel');

        await emailField.setValue(process.env.USER_EMAIL);
        await passwordField.setValue(process.env.USER_PASSWORD);
        await submitButton.click();
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
