import reducer, { fetchIngredients, initialState } from './ingredientsSlice';
import { TIngredient } from '../utils/types';

const ingredients: TIngredient[] = [
  {
    _id: 'bun-1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'bun.png',
    image_large: 'bun-large.png',
    image_mobile: 'bun-mobile.png'
  }
];

describe('Редьюсер ingredientsSlice', () => {
  test('Стейт fetchIngredients.pending', () => {
    const initialIngredientsState = {
      ...initialState,
      isIngredientsLoading: false,
      error: null
    };

    const state = reducer(
      initialIngredientsState,
      fetchIngredients.pending('', undefined)
    );

    expect(state).toEqual({
      ...initialIngredientsState,
      isIngredientsLoading: true,
      error: null
    });
  });

  test('Стейт fetchIngredients.fulfilled', () => {
    const initialIngredientsState = {
      ...initialState,
      isIngredientsLoading: true,
      error: null
    };

    const state = reducer(
      initialIngredientsState,
      fetchIngredients.fulfilled(ingredients, '', undefined)
    );

    expect(state).toEqual({
      ...initialIngredientsState,
      ingredients,
      isIngredientsLoading: false,
      error: null
    });
  });

  test('Стейт fetchIngredients.rejected', () => {
    const initialIngredientsState = {
      ...initialState,
      isIngredientsLoading: true,
      error: null
    };

    const action = fetchIngredients.rejected(
      new Error('Ошибка загрузки ингредиентов'),
      '',
      undefined
    );

    const state = reducer(initialIngredientsState, action);

    expect(state).toEqual({
      ...initialIngredientsState,
      isIngredientsLoading: false,
      error: 'Ошибка загрузки ингредиентов'
    });
  });
});
