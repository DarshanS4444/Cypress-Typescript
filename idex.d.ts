declare namespace Cypress {
    interface Chainable {
      task(event: 'parsePdf', args: { filePath: string }): Chainable<string>
    }
  }
  