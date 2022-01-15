import { Chainable } from './types'

export const blogSelectors = {
  get latestBlogPostPreview(): Chainable {
    return cy.findAllByRole('link', { name: 'Read Post' })
  },
  get greeting(): Chainable {
    return cy.findByText(/Read articles written by me/, {
      ignore: '#__next-route-announcer__,title',
    })
  },
  get authorLink(): Chainable {
    return cy.findByRole('link', { name: 'Jimmy Guzman Moreno' })
  },
}

export const blogActions = {
  visitLatestBlogPost: (): void => {
    blogSelectors.latestBlogPostPreview.first().click()
  },
}
