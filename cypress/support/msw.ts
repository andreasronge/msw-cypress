import { setupWorker, type SetupWorker } from 'msw/browser'
import { type HttpHandler } from 'msw';

declare global {
  namespace Cypress {
    interface Chainable {
      interceptRequest(...handlers: HttpHandler[]): void
    }
  }
}

let worker: SetupWorker

before(() => {
  worker = setupWorker()
  cy.wrap(worker.start({ onUnhandledRequest: 'bypass' }), { log: false })
})

Cypress.on('test:before:run', () => {
  if (!worker) return
  worker.resetHandlers()
})

Cypress.Commands.add('interceptRequest', (...handlers: HttpHandler[]) => {
  if (!worker) return
  worker.use(...handlers)
})