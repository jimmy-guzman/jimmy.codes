import { aboutSelectors } from '../support/about.po'
import { blogSelectors } from '../support/blog.po'
import { homeActions } from '../support/home.po'

describe('home', () => {
  beforeEach(() => cy.visit('/'))

  it('should be able to see blog page', () => {
    homeActions.visitBlogPage()
    blogSelectors.greeting.should('be.visible')
  })
  it('should be able to see about me page', () => {
    homeActions.visitAboutPage()
    aboutSelectors.greeting.should('be.visible')
  })
})
