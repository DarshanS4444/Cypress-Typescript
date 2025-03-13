import { DataTable, Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginOps from "../../../business-operations/swagLabs/loginOps";

Given('I login to application with below credentials', (credentials: DataTable) => {
    LoginOps.loginToApplication(credentials)
})
Then('I verify user login successful', () => {
    cy.log('awdd222')
})