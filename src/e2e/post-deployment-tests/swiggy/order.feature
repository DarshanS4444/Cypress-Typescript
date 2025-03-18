Feature: Tests to order food from Swiggy


    Scenario: Search and Select a Restaurant 
        Given I search for "Taj Hotel" restaurant in "Shivamogga" location
        Then I verify restaurant menu is loaded
           