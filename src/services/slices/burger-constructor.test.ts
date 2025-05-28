import { TConstructorIngredient } from '@utils-types';
import { burgerConstructorSlice, initialState } from './burger-constructor';

function omit<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

const MOCK_BUN: TConstructorIngredient = {
  id: '1',
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
const MOCK_INGREDIENT: TConstructorIngredient = {
  id: '2',
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};
const MOCK_INGREDIENT2: TConstructorIngredient = {
  id: '3',
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

describe('burgerConstructorSlice', () => {
  it('should return initial state', () => {
    const state = burgerConstructorSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should add bun', () => {
    const nextState = burgerConstructorSlice.reducer(
      initialState,
      burgerConstructorSlice.actions.addIngredient(MOCK_BUN)
    );

    expect(omit(nextState.bun!, 'id')).toEqual(omit(MOCK_BUN, 'id'));
  });

  it('should add ingredient', () => {
    const nextState = burgerConstructorSlice.reducer(
      initialState,
      burgerConstructorSlice.actions.addIngredient(MOCK_INGREDIENT)
    );

    expect(omit(nextState.ingredients[0], 'id')).toEqual(
      omit(MOCK_INGREDIENT, 'id')
    );
  });

  it('should move ingredient up', () => {
    const nextState = burgerConstructorSlice.reducer(
      {
        ...initialState,
        ingredients: [MOCK_INGREDIENT, MOCK_INGREDIENT2]
      },
      burgerConstructorSlice.actions.upIngredient(1)
    );

    expect(nextState.ingredients).toEqual([MOCK_INGREDIENT2, MOCK_INGREDIENT]);
  });

  it("shouldn't move first ingredient up", () => {
    const nextState = burgerConstructorSlice.reducer(
      {
        ...initialState,
        ingredients: [MOCK_INGREDIENT, MOCK_INGREDIENT2]
      },
      burgerConstructorSlice.actions.upIngredient(0)
    );

    expect(nextState.ingredients).toEqual([MOCK_INGREDIENT, MOCK_INGREDIENT2]);
  });

  it('should move ingredient down', () => {
    const nextState = burgerConstructorSlice.reducer(
      {
        ...initialState,
        ingredients: [MOCK_INGREDIENT, MOCK_INGREDIENT2]
      },
      burgerConstructorSlice.actions.downIngredient(0)
    );

    expect(nextState.ingredients).toEqual([MOCK_INGREDIENT2, MOCK_INGREDIENT]);
  });

  it("shouldn't move last ingredient down", () => {
    const nextState = burgerConstructorSlice.reducer(
      {
        ...initialState,
        ingredients: [MOCK_INGREDIENT, MOCK_INGREDIENT2]
      },
      burgerConstructorSlice.actions.downIngredient(1)
    );

    expect(nextState.ingredients).toEqual([MOCK_INGREDIENT, MOCK_INGREDIENT2]);
  });

  it('should remove ingredient', () => {
    const nextState = burgerConstructorSlice.reducer(
      {
        ...initialState,
        ingredients: [MOCK_INGREDIENT, MOCK_INGREDIENT2]
      },
      burgerConstructorSlice.actions.removeIngredient(MOCK_INGREDIENT)
    );

    expect(nextState.ingredients).toEqual([MOCK_INGREDIENT2]);
  });

  it('should clear state', () => {
    const nextState = burgerConstructorSlice.reducer(
      {
        bun: MOCK_BUN,
        ingredients: [MOCK_INGREDIENT, MOCK_INGREDIENT2],
        error: 'some error'
      },
      burgerConstructorSlice.actions.clear()
    );

    expect(nextState).toEqual({
      bun: null,
      ingredients: [],
      error: null
    });
  });
});
