Feature: Login Tests of swagLabs

    Scenario: Scenario name: Login with valid credentials 
    
        Given I login to application with below credentials
            | username | standard_user |
            | password | secret_sauce  |
        Then I verify user login successful