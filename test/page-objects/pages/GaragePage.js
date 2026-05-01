class GaragePage {
    get carsPanel() {
        return $('.panel-page');
    }

    async verifyGaragePageIsReady() {
        await this.carsPanel.waitForDisplayed();
    }
}

export default new GaragePage();
