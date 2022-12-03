Feature: Bootcamp E2E

    Background:
        Given I am on the home page

    @search
    Scenario: Search Bar
        When I enter "Windows" in the search bar
        * I Click the search button
        Then I see at least 1 item in search results

    @logo
    Scenario: Internet shop logo button
        When I open Today's Best Deals tab
        * I click on the Internet shop logo
        Then I am on the main page


