import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { getOrderByNumberApi } from '@api';

interface OrderState {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  isLoading: false,
  error: null
};

export const fetchOrder = createAsyncThunk(
  'order/fetchDetails',
  async (number: number) =>
    getOrderByNumberApi(number).then((response) => response.orders?.[0])
);

const orderSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
  selectors: {
    selectOrderDetails: (state) => state
  }
});

export const { selectOrderDetails } = orderSlice.selectors;

export default orderSlice.reducer;
