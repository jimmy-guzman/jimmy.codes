import type { Chainable } from './types'

export const appSelectors = {
  get aboutLink(): Chainable {
    return cy.findByRole('link', { name: 'about' })
  },
  get blogLink(): Chainable {
    return cy.findByRole('link', { name: 'blog' })
  },
}

export const appActions = {
  visitAboutPage: (): void => {
    appSelectors.aboutLink.click()
  },
  visitBlogPage: (): void => {
    appSelectors.blogLink.click()
  },
}
