// import { expect, browser, $ } from '@wdio/globals';

describe('Selectors practice', () => {
    it('CSS - get by class', async () => {
        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );

        await $('.header_signin').click();

        // await $('.header_signin').click(); // 21.5s
        // await $('//button[text()="Sign In"]').click(); // 25.4s
    });
});
