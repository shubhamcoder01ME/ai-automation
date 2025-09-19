Feature: Login Page
  Scenario: Verify the Playwright website title
    Given I open the browser
    When I navigate to "https://playwright.dev/"
    Then the page title should contain "Playwright"
    
