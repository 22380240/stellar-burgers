import { feedSlice, getAllOrders, getOrderInfo, initialState } from './feed';
import { TOrder } from '@utils-types';

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

describe('feedSlice', () => {
  it('should return initial state', () => {
    const state = feedSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});

describe('getAllOrders ', () => {
  it('should set loading on pending', () => {
    const nextState = feedSlice.reducer(initialState, {
      type: getAllOrders.pending.type
    });

    expect(nextState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should set state on fulfilled', () => {
    const nextState = feedSlice.reducer(initialState, {
      type: getAllOrders.fulfilled.type,
      payload: {
        orders: [MOCK_ORDER],
        total: 1,
        totalToday: 100
      }
    });

    expect(nextState).toEqual({
      ...initialState,
      orders: [MOCK_ORDER],
      total: 1,
      totalToday: 100
    });
  });

  it('should set error on rejected', () => {
    const nextState = feedSlice.reducer(initialState, {
      type: getAllOrders.rejected.type,
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

describe('getOrderInfo ', () => {
  it('should set loading on pending', () => {
    const nextState = feedSlice.reducer(initialState, {
      type: getOrderInfo.pending.type
    });

    expect(nextState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should set state on fulfilled', () => {
    const nextState = feedSlice.reducer(initialState, {
      type: getOrderInfo.fulfilled.type,
      payload: {
        orders: [MOCK_ORDER]
      }
    });

    expect(nextState).toEqual({
      ...initialState,
      orderInfo: MOCK_ORDER
    });
  });

  it('should set error on rejected', () => {
    const nextState = feedSlice.reducer(initialState, {
      type: getOrderInfo.rejected.type,
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
