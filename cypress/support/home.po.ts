export const homeSelectors = {
  get aboutLink() {
    return cy.findByRole('link', { name: 'more about me' })
  },
  get blogLink() {
    return cy.findByRole('link', { name: 'read my blog' })
  },
  get greeting() {
    return cy.findByRole('heading', {
      name: /Hi, I'm Jimmy/,
    })
  },
}

export const homeActions = {
  visitBlogPage: () => {
    homeSelectors.blogLink.first().click()
  },
  visitAboutPage: () => {
    homeSelectors.aboutLink.first().click()
  },
}
