import { createSlice } from '@reduxjs/toolkit';
import { apiConfigs } from '../constants';
import { handleThunk, thunks } from './thunk';

export type ApiState = {
  loading: boolean;
  error: null;
  [key: string]: string | number | boolean | null;
};

const apiSlice = createSlice({
  name: 'data',
  initialState: apiConfigs.reduce(
    (acc: ApiState, { key }) => {
      acc[key] = null;
      return acc;
    },
    { loading: false, error: null }
  ),
  reducers: {},
  extraReducers: (builder) => {
    apiConfigs.forEach(({ key }) => {
      handleThunk(builder, thunks[key], key);
    });
  },
});

export const { newsAPI, gaurdianAPI, nytAPI } = thunks;
export default apiSlice.reducer;
