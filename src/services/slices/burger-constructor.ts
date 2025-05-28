import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

export type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  error: string | null;
};

export const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
  error: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: crypto.randomUUID() }
      })
    },
    upIngredient: ({ ingredients }, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index <= 0) {
        return;
      }

      [ingredients[index - 1], ingredients[index]] = [
        ingredients[index],
        ingredients[index - 1]
      ];
    },
    downIngredient: ({ ingredients }, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= ingredients.length - 1) {
        return;
      }

      [ingredients[index + 1], ingredients[index]] = [
        ingredients[index],
        ingredients[index + 1]
      ];
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients.splice(
        state.ingredients.findIndex(({ id }) => id === action.payload.id),
        1
      );
    },
    clear: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.error = null;
    }
  }
});
