import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

type ConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  order: null,
  isLoading: false,
  error: null
};

export const sendOrder = createAsyncThunk(
  'order/create',
  async (data: string[]) =>
    orderBurgerApi(data)
      .then((response) => getOrderByNumberApi(response.order.number))
      .then((response) => response.orders[0])
);

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (
        state,
        action: PayloadAction<TIngredient | TConstructorIngredient>
      ) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
          return;
        }
        state.ingredients.push(ingredient as TConstructorIngredient);
      },
      prepare: (ingredient: TIngredient) => ({
        payload:
          ingredient.type === 'bun'
            ? ingredient
            : { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedItem] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, movedItem);
    },

    clearConstructor: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
  selectors: {
    selectConstructorItems: (state) => state,
    selectOrderIngredientIds: (state) => {
      const bunId = state.bun?._id;
      return bunId
        ? [bunId, ...state.ingredients.map((i) => i._id), bunId]
        : state.ingredients.map((i) => i._id);
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;

export const { selectConstructorItems, selectOrderIngredientIds } =
  burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
