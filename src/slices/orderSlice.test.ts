import reducer, { clearOrder, initialState, sendOrder } from './orderSlice';
import { TOrder } from '../utils/types';

const order: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Оформленный бургер',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:10:00.000Z',
  number: 900,
  ingredients: ['bun-1', 'main-1']
};

describe('Редьюсер orderSlice', () => {
  test('Стейт sendOrder.pending', () => {
    const initialOrderState = {
      ...initialState,
      isLoading: false,
      error: null
    };

    const state = reducer(
      initialOrderState,
      sendOrder.pending('', ['bun-1', 'main-1'])
    );

    expect(state).toEqual({
      ...initialOrderState,
      isLoading: true,
      error: null
    });
  });

  test('Стейт sendOrder.fulfilled', () => {
    const initialOrderState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const state = reducer(
      initialOrderState,
      sendOrder.fulfilled(order, '', ['bun-1', 'main-1'])
    );

    expect(state).toEqual({
      ...initialOrderState,
      order,
      isLoading: false,
      error: null
    });
  });

  test('Стейт sendOrder.rejected', () => {
    const initialOrderState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const action = sendOrder.rejected(
      new Error('Ошибка оформления заказа'),
      '',
      ['bun-1', 'main-1']
    );

    const state = reducer(initialOrderState, action);

    expect(state).toEqual({
      ...initialOrderState,
      isLoading: false,
      error: 'Ошибка оформления заказа'
    });
  });

  test('Стейт clearOrder', () => {
    const initialOrderState = {
      ...initialState,
      order,
      error: 'Ошибка'
    };

    const state = reducer(initialOrderState, clearOrder());

    expect(state).toEqual(initialState);
  });
});
