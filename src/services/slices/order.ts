import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TOrderState = {
  order: TOrder | null;
  isOrderLoading: boolean;
  error: string | null | undefined;
};

export const initialState: TOrderState = {
  order: null,
  isOrderLoading: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  'orders/orderBurger',
  orderBurgerApi
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.isOrderLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurger.pending, (state) => {
      state.isOrderLoading = true;
    });
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.isOrderLoading = false;
      state.order = action.payload.order;
    });
    builder.addCase(orderBurger.rejected, (state, action) => {
      state.isOrderLoading = false;
      state.error = action.error.message;
    });
  }
});
