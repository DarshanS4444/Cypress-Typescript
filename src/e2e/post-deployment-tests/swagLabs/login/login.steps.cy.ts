import { DataTable, Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I login to application with below credentials', (credentials: DataTable) => {
    cy.log('atatat')
})
Then('I verify user login successful', () => {
    cy.log('awdd222')
})