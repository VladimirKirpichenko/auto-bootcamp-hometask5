const { Given, When, Then } = require('@wdio/cucumber-framework');
const TIMEOUT = 9999;
const PAGE_URL = "https://www.newegg.com/";

Given("I am on the home page", async () => {
    await browser.url(PAGE_URL);
});

When("I enter {string} in the search bar", async (searchWord) => {
    const searchBar = await $('input[type="search"][title="Search Site"] ');
    searchBar.setValue(searchWord);
});

When("I Click the search button", async () => {
    const searchButton = await $('div.header2021-search-button>button');
    await searchButton.click();
});

When("I open Today's Best Deals tab", async () => {    
    const todaysBestDealsButton = await $('#trendingBanner_720202');
    await todaysBestDealsButton.click();

    const todaysBestDealsText = await $('li.is-current');
    await todaysBestDealsText.waitForDisplayed(TIMEOUT);
    await expect(todaysBestDealsText).toHaveTextContaining("Today's Best Deals");
});

When("I click on the Internet shop logo", async () => {    
    const shopLogoButton = await $(`div.header2021-logo>a[href="${PAGE_URL}"]`);
    await shopLogoButton.click();
});

Then("I see at least {int} item in search results", async (itemsAmount) => {
    const searchResultsText = await $('li.is-current');
    await searchResultsText.waitForDisplayed(TIMEOUT);
    const searchResultItems = await $$('div.item-cell');
    await expect(searchResultsText).toHaveTextContaining("Search Results:");
    await expect(searchResultItems).toBeElementsArrayOfSize({ gte: itemsAmount });
});

Then("I am on the main page", async () => {
    await browser.maximizeWindow();
    const sideMenuElement = await $('div[class="menu-list menu-level-2"]:first-of-type a[title="Components & Storage"]');
    await sideMenuElement.waitForDisplayed(TIMEOUT);
    await expect(browser).toHaveUrl(PAGE_URL);
    await expect(sideMenuElement).toHaveTextContaining("Components & Storage");
});