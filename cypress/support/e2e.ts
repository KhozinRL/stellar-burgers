import './commands';

beforeEach(() => {
  cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
  cy.intercept('POST', '**/orders', {
    fixture: 'order-create.json',
    delay: 100
  }).as('createOrder');
  cy.intercept('GET', '**/orders/12345', {
    fixture: 'order.json',
  }).as('getOrder');
});
