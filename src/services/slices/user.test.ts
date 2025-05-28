import { TOrder, TUser } from '@utils-types';
import {
  getOrders,
  getUser,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userSlice
} from './user';

const MOCK_USER: TUser = {
  email: 'none@none',
  name: 'none'
};

const MOCK_ORDER: TOrder = {
  _id: '68370eb5c2f30c001cb28042',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093c'
  ],
  status: 'done',
  name: 'Краторный люминесцентный бургер',
  createdAt: '2025-05-28T13:25:09.437Z',
  updatedAt: '2025-05-28T13:25:10.127Z',
  number: 79271
};

describe('userSlice', () => {
  it('should return initial state', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});

describe('loginUser', () => {
  it('should set loading on pending', () => {
    const nextState = userSlice.reducer(initialState, {
      type: loginUser.pending.type
    });

    expect(nextState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should set state on fulfilled', () => {
    const nextState = userSlice.reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: MOCK_USER
    });

    expect(nextState).toEqual({
      ...initialState,
      user: MOCK_USER,
      isAuth: true
    });
  });

  it('should set error on rejected', () => {
    const nextState = userSlice.reducer(initialState, {
      type: loginUser.rejected.type,
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

describe('registerUser', () => {
  it('should set loading on pending', () => {
    const nextState = userSlice.reducer(initialState, {
      type: registerUser.pending.type
    });

    expect(nextState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should set state on fulfilled', () => {
    const nextState = userSlice.reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: MOCK_USER
    });

    expect(nextState).toEqual({
      ...initialState,
      user: MOCK_USER,
      isAuth: true
    });
  });

  it('should set error on rejected', () => {
    const nextState = userSlice.reducer(initialState, {
      type: registerUser.rejected.type,
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

describe('logoutUser', () => {
  it("shouldn't set loading on pending", () => {
    const nextState = userSlice.reducer(initialState, {
      type: logoutUser.pending.type
    });

    expect(nextState).toEqual({
      ...initialState
    });
  });

  it('should set state on fulfilled', () => {
    const nextState = userSlice.reducer(initialState, {
      type: logoutUser.fulfilled.type
    });

    expect(nextState).toEqual({
      ...initialState
    });
  });
});

describe('getUser', () => {
  it('should set loading on pending', () => {
    const nextState = userSlice.reducer(initialState, {
      type: getUser.pending.type
    });

    expect(nextState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should set state on fulfilled', () => {
    const nextState = userSlice.reducer(initialState, {
      type: getUser.fulfilled.type,
      payload: { user: MOCK_USER }
    });

    expect(nextState).toEqual({
      ...initialState,
      user: MOCK_USER,
      isAuth: true
    });
  });

  it('should set error on rejected', () => {
    const nextState = userSlice.reducer(initialState, {
      type: getUser.rejected.type,
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

describe('updateUser', () => {
  it('should set loading on pending', () => {
    const nextState = userSlice.reducer(initialState, {
      type: updateUser.pending.type
    });

    expect(nextState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should set state on fulfilled', () => {
    const nextState = userSlice.reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: { user: MOCK_USER }
    });

    expect(nextState).toEqual({
      ...initialState,
      user: MOCK_USER,
      isAuth: true
    });
  });

  it('should set error on rejected', () => {
    const nextState = userSlice.reducer(initialState, {
      type: updateUser.rejected.type,
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

describe('getOrders', () => {
  it('should set loading on pending', () => {
    const nextState = userSlice.reducer(initialState, {
      type: getOrders.pending.type
    });

    expect(nextState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should set state on fulfilled', () => {
    const nextState = userSlice.reducer(initialState, {
      type: getOrders.fulfilled.type,
      payload: [MOCK_ORDER]
    });

    expect(nextState).toEqual({
      ...initialState,
      orders: [MOCK_ORDER]
    });
  });

  it('should set error on rejected', () => {
    const nextState = userSlice.reducer(initialState, {
      type: getOrders.rejected.type,
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
