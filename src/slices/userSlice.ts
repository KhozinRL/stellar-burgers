import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

interface TUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  error: string | null;
  isLoading: boolean;
}

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData) => {
    const response = await loginUserApi(loginData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi().then((response) => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
    return response;
  })
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
      })

      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
        state.isAuthChecked = true;
      })

      .addCase(logoutUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
      });
  },
  selectors: {
    selectUserState: (state) => state,
    selectUserInfo: (state) => state.user
  }
});

export const { selectUserState, selectUserInfo } = userSlice.selectors;

export default userSlice.reducer;
