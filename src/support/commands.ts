/// <reference types="cypress" />

import { dataContext } from "../resources/dataContext"

// Below are few format examples
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
        /**
       * Custom command to get the URL for a given key based on the environment.
       * The environment is specified using the CYPRESS_environment variable.
       * Defaults to 'SIT' environment if none is specified.
       * @param {string} urlKey - The key for the URL to retrieve (e.g., 'swagLabsBaseURL', 'DummyBaseURL').
       * @returns {Chainable<string>} The URL corresponding to the provided key.
       */
      getBaseURL(): Chainable<string>

      /**
       * Clear the Data from test data context
       */
      clearDataContext(): Chainable<void>
    }
   
  }
}
Cypress.Commands.add('getBaseURL', () => {
  const env: string = Cypress.env('environment')
  const product: string = Cypress.env('product')
  cy.readFile('./src/resources/environments.json').then((envConfig) => {
    return envConfig[product.toLowerCase()][env.toLowerCase()]['BaseURL']
  })
})
Cypress.Commands.add('clearDataContext', () => {
  cy.log('Clearing all Data from context')
  dataContext.clearData()
})
