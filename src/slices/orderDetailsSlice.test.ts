import reducer, { fetchOrder, initialState } from './orderDetailsSlice';
import { TOrder } from '../utils/types';

const order: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Детальный бургер',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:10:00.000Z',
  number: 700,
  ingredients: ['bun-1', 'main-1']
};

describe('Редьюсер orderDetailsSlice', () => {
  test('Стейт fetchOrder.pending', () => {
    const initialOrderDetailsState = {
      ...initialState,
      isLoading: false,
      error: null
    };

    const state = reducer(
      initialOrderDetailsState,
      fetchOrder.pending('', 1250)
    );

    expect(state).toEqual({
      ...initialOrderDetailsState,
      isLoading: true,
      error: null
    });
  });

  test('Стейт fetchOrder.fulfilled', () => {
    const initialOrderDetailsState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const state = reducer(
      initialOrderDetailsState,
      fetchOrder.fulfilled(order, '', 1250)
    );

    expect(state).toEqual({
      ...initialOrderDetailsState,
      order,
      isLoading: false,
      error: null
    });
  });

  test('Стейт fetchOrder.rejected', () => {
    const initialOrderDetailsState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const action = fetchOrder.rejected(
      new Error('Ошибка загрузки заказа'),
      '',
      1250
    );

    const state = reducer(initialOrderDetailsState, action);

    expect(state).toEqual({
      ...initialOrderDetailsState,
      isLoading: false,
      error: 'Ошибка загрузки заказа'
    });
  });
});
