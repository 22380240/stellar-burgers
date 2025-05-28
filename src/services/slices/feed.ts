import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TFeedsState = {
  orders: TOrder[];
  orderInfo: TOrder | null;
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null | undefined;
};

export const initialState: TFeedsState = {
  orders: [],
  orderInfo: null,
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const getAllOrders = createAsyncThunk('feed/getAllOrders', getFeedsApi);
export const getOrderInfo = createAsyncThunk(
  'feed/getOrderInfo',
  getOrderByNumberApi
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderInfo.fulfilled, (state, action) => {
        state.orderInfo = action.payload.orders[0];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOrderInfo.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});
