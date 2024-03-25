export const appSelectors = {
  get aboutLink() {
    return cy.findByRole('link', { name: 'about' })
  },
  get blogLink() {
    return cy.findByRole('link', { name: 'blog' })
  },
}

export const appActions = {
  visitAboutPage: () => {
    appSelectors.aboutLink.click()
  },
  visitBlogPage: () => {
    appSelectors.blogLink.click()
  },
}
