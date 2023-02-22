const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Library App', () => {
    let driver;
    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        driver.manage().setTimeouts({ implicit: 50000 });
        driver.manage().window().maximize();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it('Sign up', async () => {
        await driver.get('https://library-app.firebaseapp.com');
        
        await driver.findElement(By.id('ember26')).sendKeys('user@email.com');
        let submitBtn = await driver.findElement(By.css('button.btn.btn-primary'));
        submitBtn.click();

        // Aguarda até 5s para habilitar o botão de submit
        await driver.wait(() => {
            return submitBtn.isEnabled();
        }, 5000);

        // Aguarda até 5s para buscar o elemento '.alert-success'
        const successMessage = await driver.wait(until.elementLocated(By.css('.alert-success')), 5000).getText();
        let message = successMessage.substring(0, successMessage.indexOf(":") + 1);


        assert(message == 'Thank you! We saved a fake email address with the following id:');
    });
});





