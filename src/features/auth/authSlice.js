import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://monkfish-app-zuf2e.ondigitalocean.app";

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await fetch(`${backendUrl}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      dispatch(loginSuccess());
    } else {
      dispatch(loginFailure(data.message || 'Error de inicio de sesión'));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export default authSlice.reducer;