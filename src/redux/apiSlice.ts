import { createSlice } from '@reduxjs/toolkit';
import { apiConfigs } from '../constants';
import { handleThunk, thunks } from './thunk';

export type ApiState = {
  loading: boolean;
  error: null;
  newsAPI?: {
    news: []; // Replace `any` with the specific type for `news` if known
  };
} & {
  [key: string]: string | number | boolean | null | undefined | { news: [] };
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
