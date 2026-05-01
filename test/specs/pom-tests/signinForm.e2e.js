// import { expect, browser, $ } from '@wdio/globals';

import HomePage from '#pages/HomePage.js';
import SignInForm from '#test/page-objects/forms/SignInForm.js';

describe('Form validation - incorrect data', () => {
    beforeEach('Login', async () => {
        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );
        await HomePage.openSigninForm();
    });

    it('Email field - email is empty', async () => {
        await SignInForm.setEmail('');
        await SignInForm.clickEmailLabel();
        await expect(await SignInForm.getEmailErrorMessageText()).toBe(
            'Email required',
        );
    });

    it('Password field - password is empty', async () => {
        await SignInForm.setPassword('');
        await SignInForm.clickPasswordLabel();
        await expect(await SignInForm.getPasswordErrorMessageText()).toBe(
            'Password required',
        );
    });

    it('Email field - incorrect format', async () => {
        await SignInForm.setEmail('testuser');
        await SignInForm.clickEmailLabel();
        await expect(await SignInForm.getEmailErrorMessageText()).toBe(
            'Email is incorrect',
        );
    });

    it('Email and Password fields - incorrect data', async () => {
        await SignInForm.setEmail('testuser@gmail.com');
        await SignInForm.setPassword('testpassword');
        await SignInForm.clickSubmitButton();
        await expect(await SignInForm.getWrongDataErrorMessage()).toBe(
            'Wrong email or password',
        );
    });
});

describe('Form validation - correct data', () => {
    it('Email and Password fields - incorrect data', async () => {
        await SignInForm.setEmail(process.env.USER_EMAIL);
        await SignInForm.setPassword(process.env.USER_PASSWORD);
        await SignInForm.clickSubmitButton();
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
