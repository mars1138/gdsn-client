import { createSlice } from '@reduxjs/toolkit';

const initialAuth = {
  isAuthenticated: false,
  userId: null,
  token: null,
  expireDate: null,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuth,
  reducers: {
    Login(state, action) {
      console.log('action.payload: ', action.payload);
      const { user, token, expireDate } = action.payload;

      const tokenExpire =
        expireDate || new Date(new Date().getTime() + 1000 * 60 * 60).getTime(); // 1hr in future

      state.isAuthenticated = true;
      state.userId = user;
      state.token = token;
      state.expireDate = tokenExpire;

      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: user,
          token: token,
          expireDate: tokenExpire,
        })
      );
    },
    Logout(state, action) {
      console.log('logging out...');
      state.isAuthenticated = false;
      state.userId = null;
      state.token = null;
      state.expireDate = null;
      localStorage.removeItem('userData');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
