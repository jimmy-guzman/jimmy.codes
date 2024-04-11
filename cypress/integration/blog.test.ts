import { blogActions, blogSelectors } from "../support/blog.po";

describe("blog", () => {
  beforeEach(() => {
    return cy.visit("/blog");
  });

  it("should be able to read latest post", () => {
    blogActions.visitLatestBlogPost();

    blogSelectors.authorLink.should("be.visible");
  });
});
