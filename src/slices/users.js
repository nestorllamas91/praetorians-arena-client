import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Router from 'next/router';
import Cookies from 'universal-cookie';

export const logOutUser = createAsyncThunk('user/logout', async (token, { rejectWithValue }) => {
  try {
    const url = '/auth/logout';
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axios.post(url, undefined, config);
    new Cookies().remove('user_session');
    Router.push('/');
    return res.data;
  } catch (err) {
    if (!err.response) throw err;
    return rejectWithValue(err.response.data);
  }
});

const sliceUser = createSlice({
  name: 'user',
  initialState: { data: null, isAuthenticated: false },
  reducers: {
    logInUser: state => {
      Router.push('/auth/login');
      return { ...state };
    },
    loadUser: (state, { payload }) => ({ data: payload.user, isAuthenticated: true })
  },
  extraReducers: {
    [logOutUser.pending]: state => state,
    [logOutUser.fulfilled]: () => ({ data: null, isAuthenticated: false }),
    [logOutUser.rejected]: state => state
  }
});

const { actions, reducer } = sliceUser;
export const { logInUser, loadUser } = actions;
export default reducer;
