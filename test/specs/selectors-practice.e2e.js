// import { expect, browser, $ } from '@wdio/globals';

describe('Selectors practice', () => {
    it('CSS - get by class', async () => {
        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );
        await $('.header_signin').click(); //21.5s
    });

    it('XPath - get by class', async () => {
        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );
        await $(
            '//button[@class="hero-descriptor_btn btn btn-primary"]',
        ).click(); // 16.4s
        // await $('//button[text()="Sign In"]').click(); // 25.4s
    });

    it('By text', async () => {
        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );
        await $('=Sign In').click(); // 16.4s
    });

    it('By text partly', async () => {
        await browser.url(
            'https://' + process.env.CREDENTIALS + 'qauto.forstudy.space/',
        );
        await $('*=Sign I').click(); // 15.8s
    });
});
