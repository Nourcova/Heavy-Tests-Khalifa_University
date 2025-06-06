describe('Login Page 17', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.contains(/login/i);
    cy.intercept('POST', 'https://qapi.ku-ai-instructor.azzammourad.org/auth/login').as('loginRequest');
    cy.intercept('POST', 'https://test2.ku-ai-instructor.azzammourad.org/favicon.ico').as('chapterLoaded');
    cy.intercept('POST', 'https://api.heygen.com/v1/streaming.start').as('streamingStart');
  });

  it('LoginTC_001, Verify successful login with valid credentials', () => {

    cy.get('input[name="username"]').type("1017")
    cy.get('input[name="password"]').type("1017us")

    cy.contains('button', 'Submit').click(); // Click the submit button

    cy.wait('@loginRequest') // Wait for the request to complete
      .its('response.statusCode').should('eq', 200); // Assert response status
      cy.wait(2000)
    cy.contains(/courses/i).should('exist')
  })

  it('LoginTC_002, Verify error message for incorrect password', () => {
    cy.get('input[name="username"]').type("1017")
    cy.get('input[name="password"]').type("1017ahh")

    cy.contains('button', 'Submit').click(); // Click the submit button

    cy.wait('@loginRequest') // Wait for the request to complete
      .its('response.statusCode').should('eq', 401); // Assert response status
    cy.contains(/incorrect username or password/i)
  })

  it('LoginTC_003, Verify error message for incorrect password', () => {
    cy.get('input[name="username"]').type("no user")
    cy.get('input[name="password"]').type("no pass")

    cy.contains('button', 'Submit').click(); // Click the submit button

    cy.wait('@loginRequest') // Wait for the request to complete
      .its('response.statusCode').should('eq', 401); // Assert response status
    cy.contains(/incorrect username or password/i)
  })

  it('LoginTC_004, Verify login with empty username/password fields', () => {
    cy.get('button').should('be.disabled');
  })

})