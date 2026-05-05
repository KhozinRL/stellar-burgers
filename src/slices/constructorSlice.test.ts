import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  initialState
} from './constructorSlice';
import { TConstructorIngredient, TIngredient } from '../utils/types';

const bun: TIngredient = {
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
};

const ingredient: TIngredient = {
  _id: 'main-1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'main.png',
  image_large: 'main-large.png',
  image_mobile: 'main-mobile.png'
};

const constructorIngredient: TConstructorIngredient = {
  id: 'some-id',
  ...ingredient
};

const ingredients: TConstructorIngredient[] = [
  constructorIngredient,
  {
    id: 'some-id-2',
    _id: 'sauce-1',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 300,
    price: 90,
    image: 'sauce.png',
    image_large: 'sauce-large.png',
    image_mobile: 'sauce-mobile.png'
  }
];

describe('Редьюсер burgerConstructorSlice', () => {
  describe('addIngredient', () => {
    test('Добавление булки', () => {
      const initialConstructorState = {
        ...initialState,
        bun: null,
        ingredients: []
      };

      const newState = reducer(initialConstructorState, addIngredient(bun));

      expect(newState.bun).toEqual(bun);
      expect(newState.ingredients).toEqual([]);
    });

    test('Добавление промежуточного ингредиента', () => {
      const initialConstructorState = {
        ...initialState,
        bun: null,
        ingredients: []
      };

      const newState = reducer(
        initialConstructorState,
        addIngredient(ingredient)
      );

      expect(newState.bun).toBeNull();
      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0]).toMatchObject(ingredient);
      expect(newState.ingredients[0].id).toEqual(expect.any(String));
    });

    test('Удаление ингредиента', () => {
      const initialConstructorState = {
        ...initialState,
        ingredients: [constructorIngredient]
      };

      const newState = reducer(
        initialConstructorState,
        removeIngredient(constructorIngredient.id)
      );

      expect(newState.ingredients).toEqual([]);
    });

    test('Изменение порядка', () => {
      const initialConstructorState = {
        ...initialState,
        ingredients
      };

      const newState = reducer(
        initialConstructorState,
        moveIngredient({ fromIndex: 0, toIndex: 1 })
      );

      expect(newState.ingredients).toHaveLength(2);
      expect(newState.ingredients[0]).toMatchObject(ingredients[1]);
      expect(newState.ingredients[1]).toMatchObject(ingredients[0]);
    });
  });
});
