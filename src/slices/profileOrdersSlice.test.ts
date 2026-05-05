import reducer, {
  fetchProfileOrders,
  initialState
} from './profileOrdersSlice';
import { TOrder } from '../utils/types';

const orders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Space бургер',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:10:00.000Z',
    number: 501,
    ingredients: ['bun-1', 'main-1']
  }
];

describe('Редьюсер profileOrdersSlice', () => {
  test('Стейт fetchProfileOrders.pending', () => {
    const initialProfileOrdersState = {
      ...initialState,
      isLoading: false,
      error: null
    };

    const state = reducer(
      initialProfileOrdersState,
      fetchProfileOrders.pending('', undefined)
    );

    expect(state).toEqual({
      ...initialProfileOrdersState,
      isLoading: true,
      error: null
    });
  });

  test('Стейт fetchProfileOrders.fulfilled', () => {
    const initialProfileOrdersState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const state = reducer(
      initialProfileOrdersState,
      fetchProfileOrders.fulfilled(orders, '', undefined)
    );

    expect(state).toEqual({
      ...initialProfileOrdersState,
      orders,
      isLoading: false,
      error: null
    });
  });

  test('Стейт fetchProfileOrders.rejected', () => {
    const initialProfileOrdersState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const action = fetchProfileOrders.rejected(
      new Error('Ошибка загрузки заказов'),
      '',
      undefined
    );

    const state = reducer(initialProfileOrdersState, action);

    expect(state).toEqual({
      ...initialProfileOrdersState,
      isLoading: false,
      error: 'Ошибка загрузки заказов'
    });
  });
});
