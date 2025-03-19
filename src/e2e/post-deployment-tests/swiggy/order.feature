Feature: Tests to order food from Swiggy

    Scenario: Search and Select a Restaurant 
        Given I search for "Hotel Raj Bhavan" restaurant in "Shivamogga" location
        Then I verify restaurant menu is loaded

    Scenario: Add items to cart 
        Given I search for "Hotel Raj Bhavan" restaurant in "Shivamogga" location
        When I add below dishes to cart 
            | Name                  | Quantity | 
            | Set Dosa              | 2        | 
            | Rice Bath             | 1        |
            | Butter Milk           | 1        |
        Then I verify dishes are added to cart