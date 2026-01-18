// import { expect, browser, $ } from '@wdio/globals';

describe('Actions practice', () => {
    it('Click', async () => {
        await browser.url(
            'https://www.rapidtables.com/tools/click-counter.html',
        );
        const cypherblat = await $('//input[@type="number" and @id="count"]');
        // await expect(cypherblat).toHaveAttr('value', '0');
        await $('#addbtn').click();
        // await expect(cypherblat).toHaveAttr('value', '1');
        await browser.pause(5000);
    });

    it('Double Click', async () => {
        await browser.url(
            'https://www.rapidtables.com/tools/click-counter.html',
        );
        const cypherblat = await $('//input[@type="number" and @id="count"]');
        // await expect(cypherblat).toHaveAttr('value', '0');
        await $('#addbtn').doubleClick();
        // await expect(cypherblat).toHaveAttr('value', '1');
        await browser.pause(5000);
    });

    it('Right Click', async () => {
        await browser.url(
            'https://www.rapidtables.com/tools/click-counter.html',
        );
        const cypherblat = await $('//input[@type="number" and @id="count"]');
        // await expect(cypherblat).toHaveAttr('value', '0');
        // 0 - left, 1 - middle, 2 - right
        await $('#addbtn').click({ button: 'right' });
        // await expect(cypherblat).toHaveAttr('value', '1');
        await browser.pause(5000);
    });

    it.only('Set, clear value - email field', async () => {
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
