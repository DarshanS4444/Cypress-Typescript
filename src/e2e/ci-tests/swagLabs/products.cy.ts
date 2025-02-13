import { swagLabsTestData } from "../../../support/e2e"

describe('Products functionality tests', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type(swagLabsTestData.username)
        cy.get('#password').type(swagLabsTestData.password)
        cy.get('[data-test="login-button"]').click()
    })
    it('Add Bagpack to cart', () => {
        cy.get('button[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_name').should('have.text','Sauce Labs Backpack')
    })
    it('Order onesie to cart and complete payment', () => {
        cy.get('#add-to-cart-sauce-labs-onesie').click()
        cy.get('.shopping_cart_link').click()
        cy.get('#checkout').click()
        cy.get('#first-name').type(swagLabsTestData.shippingAddress.firstName)
        cy.get('#last-name').type(swagLabsTestData.shippingAddress.lastName)
        cy.get('#postal-code').type(swagLabsTestData.shippingAddress.pincode)
        cy.get('#continue').click()
        cy.get('#finish').click()
        cy.get('[data-test="complete-header"]').should('be.visible')
    })
})