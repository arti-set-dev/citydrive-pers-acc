describe('Функционал авторизации', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/auth', { fixture: 'auth.json' }).as(
      'loginRequest',
    );

    cy.intercept('GET', '**/employees/*', {
      statusCode: 200,
      body: {
        id: 'user-123',
        name: 'Test User',
        companyId: 'comp-1',
        token: 'fake-jwt-token',
      },
    }).as('getEmployee');

    cy.intercept('GET', '**/notifications*', { body: [] });
  });

  it('должен успешно авторизовать пользователя и сохранить токен', () => {
    cy.visit('/auth');

    cy.get('[data-testid="LoginForm.Email"]').type('test@test.com');
    cy.get('[data-testid="LoginForm.Password"]').type('password123');

    cy.get('[data-testid="LoginForm.Submit"]').click();

    cy.wait('@loginRequest');

    cy.url().should('eq', Cypress.config().baseUrl + '/');

    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('fake-jwt-token');
      expect(win.localStorage.getItem('userId')).to.eq('123');
    });
  });
});
