export const aboutSelectors = {
  get greeting() {
    return cy.findByText("About Me", {
      ignore: "#__next-route-announcer__,title",
    });
  },
};
