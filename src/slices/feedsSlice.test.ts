import reducer, { fetchFeeds, initialState } from './feedsSlice';
import { TOrder } from '../utils/types';

const orders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Флюоресцентный бургер',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:10:00.000Z',
    number: 101,
    ingredients: ['bun-1', 'main-1']
  }
];

describe('Редьюсер feedsSlice', () => {
  test('Стейт fetchFeeds.pending', () => {
    const initialFeedsState = {
      ...initialState,
      isFeedsLoading: false,
      error: null
    };

    const state = reducer(initialFeedsState, fetchFeeds.pending('', undefined));

    expect(state).toEqual({
      ...initialFeedsState,
      isFeedLoading: true,
      error: null
    });
  });

  test('Стейт fetchFeeds.fulfilled', () => {
    const initialFeedsState = {
      ...initialState,
      isFeedsLoading: true,
      error: null
    };

    const state = reducer(
      initialFeedsState,
      fetchFeeds.fulfilled(
        { success: true, orders, total: 1, totalToday: 1 },
        '',
        undefined
      )
    );

    expect(state).toEqual({
      ...initialFeedsState,
      orders,
      isFeedLoading: false,
      error: null
    });
  });

  test('Стейт fetchFeeds.rejected', () => {
    const initialFeedsState = {
      ...initialState,
      isFeedsLoading: true,
      error: null
    };

    const action = fetchFeeds.rejected(
      new Error('Ошибка загрузки'),
      '',
      undefined
    );

    const state = reducer(initialFeedsState, action);

    expect(state).toEqual({
      ...initialFeedsState,
      isFeedLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});
