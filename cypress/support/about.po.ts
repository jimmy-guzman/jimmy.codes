import type { Chainable } from './types'

export const aboutSelectors = {
  get greeting(): Chainable {
    return cy.findByText('About Me', {
      ignore: '#__next-route-announcer__,title',
    })
  },
}
