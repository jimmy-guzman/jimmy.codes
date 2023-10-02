import type { Chainable } from './types'

export const homeSelectors = {
  get aboutLink(): Chainable {
    return cy.findByRole('link', { name: 'more about me' })
  },
  get blogLink(): Chainable {
    return cy.findByRole('link', { name: 'read my blog' })
  },
  get greeting(): Chainable {
    return cy.findByRole('heading', {
      name: /Hi, I'm Jimmy/,
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
