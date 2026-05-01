// import { expect, browser, $ } from '@wdio/globals';

describe('Actions practice', () => {
    it('Click', async () => {
        await browser.url(
            'https://www.rapidtables.com/tools/click-counter.html',
        );

        const cypherblat = await $('//input[@type="number" and @id="count"]');
        await expect(cypherblat).toHaveAttr('value', '0');
        await $('#addbtn').click();
        await expect(cypherblat).toHaveAttr('value', '1');
    });

    it('Double Click', async () => {
        await browser.url(
            'https://www.rapidtables.com/tools/click-counter.html',
        );
        const cypherblat = await $('//input[@type="number" and @id="count"]');
        await expect(cypherblat).toHaveAttr('value', '0');
        await $('#addbtn').doubleClick();
        await expect(cypherblat).toHaveAttr('value', '2');
    });

    it('Right Click', async () => {
        await browser.url(
            'https://www.rapidtables.com/tools/click-counter.html',
        );

        const cypherblat = await $('//input[@type="number" and @id="count"]');
        await expect(cypherblat).toHaveAttr('value', '0');
        // 0 - left, 1 - middle, 2 - right
        await $('#addbtn').click({ button: 'right' });
        await expect(cypherblat).toHaveAttr('value', '0');
    });

    it('Set, clear value - email field', async () => {
        const userEmail = 'testuser@gmail.com';

        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );

        const emailField = await $('#signinEmail');
        await $('.header_signin').click();
        await emailField.setValue(userEmail);
        // await expect(emailField).toHaveValue('testuser@gmail.com');
        // emailField.clearValue();
        const inputValue = await emailField.getValue();
        await expect(inputValue).toEqual('testuser@gmail.com');
    });
});

describe('Form validation - incorrect data', () => {
    it('Email field - email is empty', async () => {
        const emailField = await $('#signinEmail');
        const emailErrorMessage = await $(
            'form>div:nth-child(1) .invalid-feedback',
        );
        const emailLabel = await $('label[for="signinEmail"]');

        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );

        await $('.header_signin').click();
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

        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );

        await $('.header_signin').click();
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

        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );

        await $('.header_signin').click();
        await emailField.setValue('testuser');
        await emailLabel.click();
        await expect(emailErrorMessage).toHaveText('Email is incorrect');
    });

    it('Email and Password fields - incorrect data', async () => {
        const emailField = await $('#signinEmail');
        const passwordField = await $('#signinPassword');
        const submitButton = await $('.modal-content .btn-primary');
        const errorMessage = await $('.alert-danger');

        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );

        await $('.header_signin').click();
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

        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );

        await $('.header_signin').click();
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
