import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { getFeedsApi } from '@api';

interface FeedState {
  orders: TOrder[];
  isFeedLoading: boolean;
  error: string | null;
}

export const initialState: FeedState = {
  orders: [],
  isFeedLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk('feeds/getFeeds', getFeedsApi);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isFeedLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isFeedLoading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isFeedLoading = false;
        state.error = action.error.message ?? null;
      });
  },
  selectors: {
    selectFeed: (state) => state,
    selectTodayOrders: (state) => {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      return state.orders.filter((o) => new Date(o.createdAt) >= startOfDay);
    },
    selectFeedOrderByNumber: (state, number: number) =>
      state.orders.find((o) => o.number === number)
  }
});

export const { selectFeed, selectTodayOrders, selectFeedOrderByNumber } =
  feedSlice.selectors;

export default feedSlice.reducer;
