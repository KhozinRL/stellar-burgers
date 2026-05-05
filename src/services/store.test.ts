import { rootReducer } from './store';

describe('rootReducer', () => {
  test('Должен вернуть корректное состояние для неизвестного экшена', () => {
    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      ingredients: {
        ingredients: [],
        isIngredientsLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      feed: {
        orders: [],
        isFeedLoading: false,
        error: null
      },
      user: {
        isAuthChecked: false,
        isAuthenticated: false,
        user: null,
        error: null,
        isLoading: false
      },
      profileOrders: {
        orders: [],
        isLoading: false,
        error: null
      },
      orderDetails: {
        order: null,
        isLoading: false,
        error: null
      },
      order: {
        order: null,
        isLoading: false,
        error: null
      }
    });
  });
});
