import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: undefined,
  tokens: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogedIn(state, action) {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    userLogedOut(state) {
      state.user = undefined;
      state.tokens = undefined;
      localStorage.removeItem('auth');
    },
  },
});

export const { userLogedIn, userLogedOut } = authSlice.actions;
export default authSlice.reducer;
