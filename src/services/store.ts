import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './slices/burger-constructor';
import { ingredientsSlice } from './slices/ingredients';
import { feedSlice } from './slices/feed';
import { orderSlice } from './slices/order';
import { userSlice } from './slices/user';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  feeds: feedSlice.reducer,
  order: orderSlice.reducer,
  user: userSlice.reducer
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
