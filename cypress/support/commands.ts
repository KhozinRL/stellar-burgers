Cypress.Commands.add('setAuthTokens', () => {
  window.localStorage.setItem('refreshToken', 'test-refresh-token');
  cy.setCookie('accessToken', 'test-access-token');
});

declare global {
  namespace Cypress {
    interface Chainable {
      setAuthTokens(): Chainable<void>;
    }
  }
}

export {};
