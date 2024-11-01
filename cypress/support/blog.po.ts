export const blogSelectors = {
  get authorLink() {
    return cy.findByRole("link", { name: "Jimmy Guzman Moreno" });
  },
  get greeting() {
    return cy.findByRole("heading", {
      level: 1,
      name: /Blog/,
    });
  },
  get latestBlogPostPreview() {
    return cy.findAllByRole("link", { name: "Read Post" });
  },
};

export const blogActions = {
  visitLatestBlogPost: () => {
    blogSelectors.latestBlogPostPreview.first().click();
  },
};
