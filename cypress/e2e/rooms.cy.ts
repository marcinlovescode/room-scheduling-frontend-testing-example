/// <reference types="cypress" />

context('Rooms', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    cy.get('a').contains('Rooms').click()
  })

  it('Displays rooms table header', () => {
    cy.get('table').contains('th', 'Name')
    cy.get('table').contains('th', 'Number of seats')
    cy.get('table').contains('th', 'Has projector')
    cy.get('table').contains('th', 'Has sound system')
    cy.get('table').contains('th', 'Has air conditioner')
  })

  it('Displays rooms data', () => {
    cy.get('table')
      .contains('th', 'Burning Desire')
      .parent()
      .within(() => {
        cy.get('td').eq(0).contains('10')
        cy.get(`[aria-label="Has projector checkbox"]`).should('have.attr', 'checked')
        cy.get(`[aria-label="Has sound system checkbox"]`).should('have.attr', 'checked')
        cy.get(`[aria-label="Has air conditioner checkbox"]`).should('have.attr', 'checked')
      })
    cy.get('table')
      .contains('th', 'Fortune Seekers')
      .parent()
      .within(() => {
        cy.get('td').eq(0).contains('5')
        cy.get(`[aria-label="Has projector checkbox"]`).should('have.attr', 'checked')
        cy.get(`[aria-label="Has sound system checkbox"]`).should('not.have.attr', 'checked')
        cy.get(`[aria-label="Has air conditioner checkbox"]`).should('have.attr', 'checked')
      })
    cy.get('table')
      .contains('th', 'Goal')
      .parent()
      .within(() => {
        cy.get('td').eq(0).contains('15')
        cy.get(`[aria-label="Has projector checkbox"]`).should('not.have.attr', 'checked')
        cy.get(`[aria-label="Has sound system checkbox"]`).should('have.attr', 'checked')
        cy.get(`[aria-label="Has air conditioner checkbox"]`).should('have.attr', 'checked')
      })
    cy.get('table')
      .contains('th', 'Think Out Loud')
      .parent()
      .within(() => {
        cy.get('td').eq(0).contains('8')
        cy.get(`[aria-label="Has projector checkbox"]`).should('have.attr', 'checked')
        cy.get(`[aria-label="Has sound system checkbox"]`).should('have.attr', 'checked')
        cy.get(`[aria-label="Has air conditioner checkbox"]`).should('not.have.attr', 'checked')
      })
  })

  it('Adds new room', () => {
    var expectedName = `Room_${Math.floor(Math.random() * 999)}`
    var expectedCapacity = Math.floor(Math.random() * 16)
    cy.get('button').contains(/new room/i).click()
    cy.get('#new-room-form-name').clear()
    cy.get('#new-room-form-name').type(expectedName)
    cy.get('#new-room-form-number-of-seats').clear()
    cy.get('#new-room-form-number-of-seats').type(expectedCapacity.toString())
    cy.get('#new-room-form-has-projector').click()
    cy.get('#new-room-form-has-sound-system').click()
    cy.get('#new-room-form-has-air-conditioner').dblclick()
    cy.get('button').contains(/submit/i).click()
    cy.get('table')
      .contains('th', expectedName)
      .parent()
      .within(() => {
        cy.get('td').eq(0).contains(expectedCapacity)
        cy.get(`[aria-label="Has projector checkbox"]`).should('have.attr', 'checked')
        cy.get(`[aria-label="Has sound system checkbox"]`).should('have.attr', 'checked')
        cy.get(`[aria-label="Has air conditioner checkbox"]`).should('not.have.attr', 'checked')
      })
  })
})