import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '@api';

interface IngredientsState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
}

export const initialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message ?? null;
      });
  },
  selectors: {
    getIngredientsSelector: (state) => state,
    getBunIngredients: (state) =>
      state.ingredients.filter((i) => i.type === 'bun'),
    getMainIngredients: (state) =>
      state.ingredients.filter((i) => i.type === 'main'),
    getSauceIngredients: (state) =>
      state.ingredients.filter((i) => i.type === 'sauce'),
    getIngredientById: (state, id) =>
      state.ingredients.find((i) => i._id === id)
  }
});

export const {
  getIngredientsSelector,
  getBunIngredients,
  getMainIngredients,
  getSauceIngredients,
  getIngredientById
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
