import { beforeEach } from "mocha";
import { it } from "mocha";
import { describe } from "mocha";

describe('Login tests for SwagLabs', () => {
    beforeEach(() =>{
        cy.visit('https://www.saucedemo.com/')
    })
    it('Login with valid credentials', () => {
        cy.log('abc')
    })
})