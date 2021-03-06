// Generated by Selenium IDE
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert')
const { waitForElementToBeReady, takeScreenshot, delay } = require('./helpers/selenium');

const BASE_URL = 'http://127.0.0.1:8080';

describe('3drepo.io login', function () {
	this.timeout(60000);
	let driver;

	beforeEach(async function () {
		const args = new chrome.Options().addArguments(['headless', 'disable-gpu', 'enable-logging']);

		driver = await new Builder()
			.forBrowser('chrome')
			.setChromeOptions(args)
			.build();

		await driver.get((new URL('/login', BASE_URL)).href);

		try {
			await driver.manage().window().setRect({
				width: 1025,
				height: 950
			});
		} catch (error) {
			console.log('Unable to resize window. Skipping.');
		};

		// Closes the 'update available' dialog if its showing
		try {
			const updateDialog = await waitForElementToBeReady(driver, By.css("[role='dialog'] button"), 3000);
			await updateDialog.click();
			await driver.wait(until.elementIsNotVisible((updateDialog), 2000));
		} catch (e) {
			// The 'update available' dialog is not there: carry on
		}

	})

	afterEach(async () => {
		await driver.quit();
	})

	it('Login with wrong credentials', async () => {
		try {
			await (await waitForElementToBeReady(driver, By.name('login'))).sendKeys('wrong');

			await (await waitForElementToBeReady(driver, By.name('password'))).sendKeys('credentials');

			await (await waitForElementToBeReady(driver, By.css('button[type=submit]'))).click();

			const dialogText = await (await waitForElementToBeReady(driver, By.css("[role='dialog']"))).getText();

			assert(dialogText.includes("Incorrect username or password"), "The dialog shown is not the right one!");
		} catch (e) {
			await takeScreenshot(driver);
			throw e;
		}

	});

	it('Login with proper credentials', async () => {
		try {
			await (await waitForElementToBeReady(driver, By.name('login'))).sendKeys('teamSpace1');

			await (await waitForElementToBeReady(driver, By.name('password'))).sendKeys('password');

			// Click login
			await (await waitForElementToBeReady(driver, By.css('button[type=submit]'))).click();

			//  Click user menu
			await (await waitForElementToBeReady(driver, By.css("button[aria-label='Toggle main menu']"))).click();

			//  Click logout
			await (await waitForElementToBeReady(driver, By.css("[aria-label='Logout']"))).click();
		} catch (e) {
			await takeScreenshot(driver);
			throw e;
		}
	})
})


