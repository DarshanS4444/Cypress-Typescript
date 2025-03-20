/// <reference types="cypress" />
import neatCsv from 'neat-csv'
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

      /**
       * Custom command to get the Access Token stored in local storage for a given app session.
       * @returns {Chainable<string>} The access token
       */
      getAccessToken(): Chainable<string>

      /**
       * Custom command to wait for an element to be visible.
       * This command can be used by providing a function that returns a chainable element.
       * @param {() => Cypress.Chainable<JQuery<HTMLElement>>} getElement - A function that returns a chainable element to wait for.
       * @param {number} [timeout=10000] - The time in milliseconds to wait for the element to be visible. Defaults to 10000 ms.
       * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A chainable object for further assertions.
       *
       * @example
       * // Using a getElement function
       * cy.waitForElementToBeVisible(() => cy.get('selector'), 5000); // Waits for 5 seconds
       * cy.waitForElementToBeVisible(() => cy.get('another-selector')); // Default timeout of 10 seconds
       */
      waitForElementToBeVisible(getElement: () => Cypress.Chainable<JQuery<HTMLElement>>, timeout: number): Chainable<void>

      /**
       * Custom command to wait for an element to be invisible.
       * This command can be used by providing a function that returns a chainable element.
       * @param {() => Cypress.Chainable<JQuery<HTMLElement>>} getElement - A function that returns a chainable element to wait for.
       * @param {number} [timeout=10000] - The time in milliseconds to wait for the element to be invisible. Defaults to 10000 ms.
       * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A chainable object for further assertions.
       *
       * @example
       * // Using a getElement function
       * cy.waitForElementToBeInvisible(() => cy.get('selector'), 5000); // Waits for 5 seconds
       * cy.waitForElementToBeInvisible(() => cy.get('another-selector')); // Default timeout of 10 seconds
       */
      waitForElementToBeInVisible(getElement: () => Cypress.Chainable<JQuery<HTMLElement>>): Chainable<void>

      /**
       * Wait for an element to exist in DOM within a specified timeout.
       * @param selector - The CSS selector of the element to wait for.
       * @param timeout - The maximum time to wait for the element to exist in DOM(in milliseconds).
       * @example
       * cy.waitForElementToExist('.dynamic-element', 10000)
       */
      waitForElementToExist(selector: string, timeout: number): Chainable<void>

      /**
       * Wait for an element to exist in DOM within a specified timeout.
       * @param selector - The CSS selector of the element to wait for.
       * @param text - Text message to be present in the element
       * @param timeout - The maximum time to wait for the element to exist in DOM(in milliseconds).
       * @example
       * cy.waitForText('.dynamic-element','text', 10000)
       */
      waitForText(selector: string, text: string, timeout: number): Chainable<void>

      /**
       * Wait for the URL to contain a specific part within a specified timeout.
       * @param urlPart - The part of the URL to wait for.
       * @param timeout - The maximum time to wait for the URL to contain the specified part (in milliseconds).
       * @example
       * cy.waitForUrlToContain('dashboard', 10000)
       */
      waitForUrlToContain(urlPart: string, timeout: number): Chainable<void>

      /**
       * Generates a random integer between min (inclusive) and max (inclusive).
       * @param min - The minimum value (inclusive).
       * @param max - The maximum value (inclusive).
       * @returns A random integer between min and max.
       */
      getRandomInt(min: number, max: number): Chainable<number>

      /**
       * Generates a random string of the specified length.
       * The generated string includes uppercase and lowercase letters and digits.
       * @param {number} length - The length of the random string to generate.
       * @returns {string} - A random string of the specified length.
       * @example
       * const randomString = generateRandomString(10);
       */
      getRandomString(length: number): Chainable<string>

      /**
       * Custom command to read a CSV file from the fixtures directory and return the parsed data.
       *
       * @param {string} fileName - The name of the CSV file (without the .csv extension) located in the cypress/fixtures directory.
       * @returns {Cypress.Chainable<CsvData>} - Chainable Cypress object containing the parsed CSV data.
       * type CsvData = Array<Record<string, string>>
       */
      readCSVFile(fileName: string): Chainable<CsvData>
      /**
       * Custom Cypress command to wait for the app to load.
       * This command waits for a defined period (global wait time) before proceeding with further actions.
       * It is chainable, so it can be used in any Cypress command chain.
       */
      waitForAppLoad(waitTimeInSec: number): Chainable<Element>
      /**
       * Custom Cypress command to poll for a dynamically generated element inside `.page-content`.
       * This command refreshes the page every `interval` milliseconds and checks if the element
       * with the given CSS selector is visible. It will keep polling until the element appears
       * or the timeout is reached.
       *
       * @param {string} selector - The CSS selector of the element to wait for.
       * @param {number} [timeout=180000] - The maximum time (in milliseconds) to wait for the element. Default is 3 minutes.
       * @param {number} [interval=3000] - The time interval (in milliseconds) between each retry. Default is 3 seconds.
       *
       * @example
       * // Wait for the element inside `.page-content`
       * cy.pollForElement('.due-element');
       *
       * @example
       * // Wait for an element with a specific data-testid
       * cy.pollForElement('[data-testid="test123"]', 120000, 5000);
       */

      pollForElement(selector: string, timeout: number, interval: number): Chainable<void>
      /**
       * Custom Cypress command to upload a document via a file input.
       *
       * @param {string} fileName - The name of the file to upload. The file should be located in `./src/resources/`.
       * @throws {Error} If no file name is provided or if the file input is invalid
       * cy.uploadDocument('dummy1.pdf');
       */
      uploadDocument(fileName: string): Chainable<void>
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

Cypress.Commands.add('getAccessToken', () => {
  return cy.window().then((win) => win.localStorage.getItem('accessToken') || '')
})

Cypress.Commands.add('waitForElementToBeVisible', (getElement: () => Cypress.Chainable<JQuery<HTMLElement>>, timeout = 10000) => {
  getElement().should('be.visible', { timeout })
})

Cypress.Commands.add(
  'waitForElementToBeInVisible',
  (getElement: () => Cypress.Chainable<JQuery<HTMLElement>>, timeout = 10000) => {
    getElement().should('not.be.visible', { timeout })
  },
)

Cypress.Commands.add('waitForElementToExist', (selector: string, timeout = 10000) => {
  cy.get(selector, { timeout }).should('exist')
})

Cypress.Commands.add('waitForText', (selector: string, text: string, timeout = 10000) => {
  cy.get(selector, { timeout }).should('contain.text', text)
})

Cypress.Commands.add('waitForUrlToContain', (urlPart: string, timeout = 10000) => {
  cy.url({ timeout }).should('include', urlPart)
})

Cypress.Commands.add('getRandomInt', (min: number, max: number): Cypress.Chainable<number> => {
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min
  return cy.wrap(randomInt)
})

Cypress.Commands.add('getRandomString', (length: number): Cypress.Chainable<string> => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return cy.wrap(Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join(''))
})

type CsvData = Array<Record<string, string>>
Cypress.Commands.add('readCSVFile', (fileName: string): Cypress.Chainable<CsvData> => {
  return cy.fixture(`${fileName}`).then(neatCsv)
})
Cypress.Commands.add('waitForAppLoad', (waitTimeInSec: number) => {
  cy.wait(waitTimeInSec)
})
Cypress.Commands.add('pollForElement', (selector, timeout = 180000, interval = 3000) => {
  const startTime = Date.now()
  const checkForElement = () => {
    cy.reload()
    cy.get('.page-content').then(($container) => {
      const $el = $container.find(selector)

      if ($el.length > 0 && Cypress.$($el).is(':visible')) {
        cy.wrap($el).should('be.visible')
      } else if (Date.now() - startTime < timeout) {
        cy.waitForAppLoad(interval)
        checkForElement()
      } else {
        throw new Error(`Element "${selector}" not found within ${timeout / 1000} seconds.`)
      }
    })
  }
  checkForElement()
})
Cypress.Commands.add('uploadDocument', (fileName: string) => {
  if (!fileName) {
    throw new Error('File name is required for document upload')
  }
  cy.log('Uploading Document : ' + fileName)
  cy.get('input[type="file"]').selectFile(`./src/resources/${fileName}`, { force: true })
})
