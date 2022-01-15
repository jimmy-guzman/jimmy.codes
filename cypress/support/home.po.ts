import { Chainable } from './types'

export const homeSelectors = {
  get aboutLink(): Chainable {
    return cy.findByRole('link', { name: 'more about me' })
  },
  get blogLink(): Chainable {
    return cy.findByRole('link', { name: 'read my blog' })
  },
  get greeting(): Chainable {
    return cy.findByText(/Hi, I'm Jimmy/, {
      ignore: '#__next-route-announcer__,title',
    })
  },
}

export const homeActions = {
  visitBlogPage: (): void => {
    homeSelectors.blogLink.first().click()
  },
  visitAboutPage: (): void => {
    homeSelectors.aboutLink.first().click()
  },
}
