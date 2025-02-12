import { beforeEach } from "mocha";
import { it } from "mocha";
import { describe } from "mocha";

describe('Login tests for SwagLabs', () => {
    beforeEach(() =>{
        cy.visit('https://www.saucedemo.com/')
    })
    it('Login with valid credentials', () => {
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('.app_logo').should('be.visible')
    })
    it('Login with invalid credentials', () => {
        cy.get('#user-name').type('invalid_user')
        cy.get('#password').type('invalid_password')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain.text', 'Username and password do not match any user in this service')
    })
    it('Logout user', () => {
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
        cy.get('[data-test="login-button"]').should('be.visible')
    })
})