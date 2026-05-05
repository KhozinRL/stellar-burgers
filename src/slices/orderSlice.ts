import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

type OrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: OrderState = {
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

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: () => initialState
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
    selectOrderState: (state) => state
  }
});

export const { clearOrder } = orderSlice.actions;

export const { selectOrderState } = orderSlice.selectors;

export default orderSlice.reducer;
