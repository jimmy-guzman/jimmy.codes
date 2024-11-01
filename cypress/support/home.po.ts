export const homeSelectors = {
  get aboutLink() {
    return cy.findByRole("link", { name: "more information about me" });
  },
  get blogLink() {
    return cy.findByRole("link", { name: "read my blog" });
  },
  get greeting() {
    return cy.findByRole("heading", {
      name: /Hi, I'm Jimmy/,
    });
  },
};

export const homeActions = {
  visitAboutPage: () => {
    homeSelectors.aboutLink.first().click();
  },
  visitBlogPage: () => {
    homeSelectors.blogLink.first().click();
  },
};
