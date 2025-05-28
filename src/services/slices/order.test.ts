import { TOrder } from '@utils-types';
import { initialState, orderBurger, orderSlice } from './order';

const MOCK_ORDER: TOrder = {
  _id: '683708bcc2f30c001cb2801e',
  ingredients: [
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093f',
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa093c'
  ],
  status: 'done',
  name: 'Краторный бессмертный люминесцентный бургер',
  createdAt: '2025-05-28T12:59:40.810Z',
  updatedAt: '2025-05-28T12:59:41.868Z',
  number: 79266
};

describe('orderSlice', () => {
  it('should return initial state', () => {
    const state = orderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});

describe('orderBurger', () => {
  it('should set loading on pending', () => {
    const nextState = orderSlice.reducer(initialState, {
      type: orderBurger.pending.type
    });

    expect(nextState).toEqual({
      ...initialState,
      isOrderLoading: true
    });
  });

  it('should set state on fulfilled', () => {
    const nextState = orderSlice.reducer(initialState, {
      type: orderBurger.fulfilled.type,
      payload: {
        name: 'some name',
        order: MOCK_ORDER
      }
    });

    expect(nextState).toEqual({
      ...initialState,
      order: MOCK_ORDER
    });
  });

  it('should set error on rejected', () => {
    const nextState = orderSlice.reducer(initialState, {
      type: orderBurger.rejected.type,
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
