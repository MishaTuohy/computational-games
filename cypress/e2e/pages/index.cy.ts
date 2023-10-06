describe('Index Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('renders IntroSection with correct title', () => {
    cy.get('p').contains('Student Project: Michael Alexey Tuohy')
  })

  it('renders AimSection with correct title', () => {
    cy.get('h3').contains('Aims')
  })

  it('renders GameSection with correct title', () => {
    cy.get('h3').contains('Games')
  })

  it('renders AboutSection with correct title', () => {
    cy.get('h6').contains('Repository')
  })
})

export {}
