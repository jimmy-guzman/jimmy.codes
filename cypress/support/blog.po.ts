export const blogSelectors = {
  get latestBlogPostPreview() {
    return cy.findAllByRole("link", { name: "Read Post" });
  },
  get greeting() {
    return cy.findByRole("heading", {
      name: /Blog/,
      level: 1,
    });
  },
  get authorLink() {
    return cy.findByRole("link", { name: "Jimmy Guzman Moreno" });
  },
};

export const blogActions = {
  visitLatestBlogPost: () => {
    blogSelectors.latestBlogPostPreview.first().click();
  },
};
