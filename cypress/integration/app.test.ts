import { aboutSelectors } from '../support/about.po'
import { appActions } from '../support/app.po'
import { blogSelectors } from '../support/blog.po'
import { homeSelectors } from '../support/home.po'

describe('app', () => {
  beforeEach(() => cy.visit('/'))

  it('should navigate through pages', () => {
    homeSelectors.greeting.should('be.visible')

    appActions.visitAboutPage()
    aboutSelectors.greeting.should('be.visible')

    appActions.visitBlogPage()
    blogSelectors.greeting.should('be.visible')
  })
})
