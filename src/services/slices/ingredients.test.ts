import { TIngredient } from '@utils-types';
import { getIngredients, ingredientsSlice, initialState } from './ingredients';

const MOCK_INGREDIENT: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

describe('ingredientsSlice', () => {
  it('should return initial state', () => {
    const state = ingredientsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});

describe('getIngredients', () => {
  it('should set loading on pending', () => {
    const nextState = ingredientsSlice.reducer(initialState, {
      type: getIngredients.pending.type
    });

    expect(nextState).toEqual({
      ...initialState,
      ingredientsLoading: true
    });
  });

  it('should set state on fulfilled', () => {
    const nextState = ingredientsSlice.reducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: [MOCK_INGREDIENT]
    });

    expect(nextState).toEqual({
      ...initialState,
      ingredients: [MOCK_INGREDIENT]
    });
  });

  it('should set error on rejected', () => {
    const nextState = ingredientsSlice.reducer(initialState, {
      type: getIngredients.rejected.type,
      error: {
        message: 'some error'
      }
    });

    expect(nextState).toEqual({
      ...initialState,
      error: 'some error'
    });
  });
});
