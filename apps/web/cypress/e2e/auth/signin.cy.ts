describe('User Authentication', () => {
  it('Authenticate with Google Account', () => {
    cy.visit('/signin')
    cy.get('[data-test-id=test-google-button]').click()
  })

  it('Authenticate with Github Account', () => {
    cy.visit('/signin')
    cy.get('[data-test-id=test-github-button]').click()
  })

  it('Failed to authenticated', () => {
    cy.visit('/signin?error=failed-authenticated')
    cy.get('[data-test-id=toast]').should('exist').children().contains('Failed')
  })
})
