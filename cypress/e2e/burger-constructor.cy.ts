
const addIngredient = (id: string) => {
  cy.get(`[data-cy="ingredient-${id}"]`).contains('Добавить').click();
};


describe('Страница конструктора бургера', () => {
  const bunId = '643d69a5c3f7b9001cfa093c';
  const mainId = '643d69a5c3f7b9001cfa0941';
  const sauceId = '643d69a5c3f7b9001cfa0942';
  const bunName = 'Краторная булка N-200i';
  const mainName = 'Биокотлета из марсианской Магнолии';
  const sauceName = 'Соус Spicy-X';
  const orderPrice = '3024';

  beforeEach(() => {
    cy.setAuthTokens();
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('добавляет булку и начинки в конструктор', () => {
    addIngredient(bunId);
    addIngredient(mainId);
    addIngredient(sauceId);

    cy.get('[data-cy="constructor-bun-top"]').contains(`${bunName} (верх)`);
    cy.get('[data-cy="constructor-bun-bottom"]').contains(`${bunName} (низ)`);
    cy.get('[data-cy="constructor-ingredients"]').contains(mainName);
    cy.get('[data-cy="constructor-ingredients"]').contains(sauceName);

    cy.get('[data-cy="constructor-price-total"]').should('have.text', orderPrice);
  });

  it('открывает и закрывает модальное окно ингредиента по крестику', () => {
    cy.get(`[data-cy="ingredient-link-${bunId}"]`).click();

    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]').contains('Детали ингредиента').should('exist');
    cy.get('[data-cy="modal"]').contains('h3', bunName).should('exist');

    cy.get('[data-cy="modal-close"]').should('be.visible').click();

    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрывает модальное окно ингредиента по оверлею', () => {
    cy.get(`[data-cy="ingredient-link-${mainId}"]`).click();

    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]').contains('Детали ингредиента').should('exist');
    cy.get('[data-cy="modal"]').contains('h3', mainName).should('exist');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('создаёт заказ, закрывает модалку и очищает конструктор', () => {
    addIngredient(bunId);
    addIngredient(mainId);
    addIngredient(sauceId);

    cy.get('[data-cy="order-button"]').contains('Оформить заказ').click();

    cy.get('[data-cy="modal"]').contains('Оформляем заказ...').should('exist');

    cy.wait('@createOrder').its('request.body').should('deep.equal', {
      ingredients: [bunId, mainId, sauceId, bunId]
    });
    cy.wait('@getOrder');

    cy.get('[data-cy="modal"]').contains('12345').should('exist');
    cy.get('[data-cy="modal"]').contains('идентификатор заказа').should('exist');

    cy.get('[data-cy="modal-close"]').should('be.visible').click();

    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
    cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
    cy.get('[data-cy="constructor-ingredients"]').should('not.contain', mainName);
    cy.get('[data-cy="constructor-ingredients"]').should('not.contain', sauceName);
    cy.get('[data-cy="burger-constructor"]').contains('Выберите булки').should('exist');
    cy.get('[data-cy="burger-constructor"]').contains('Выберите начинку').should('exist');
  });
});
