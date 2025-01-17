/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  AsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { apiConfigs } from '../constants';

interface ApiConfig {
  key: string;
  url: string;
}

interface State {
  loading: boolean;
  error: string | null;
  [key: string]: any;
}

const generateThunk = (
  key: string,
  url: string
): AsyncThunk<any, void, { rejectValue: string }> =>
  createAsyncThunk<any, void, { rejectValue: string }>(
    `data/fetch${key}`,
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${key} data`);
        return await response.json();
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

export const thunks = apiConfigs.reduce(
  (
    acc: Record<string, AsyncThunk<any, void, { rejectValue: string }>>,
    { key, url }: ApiConfig
  ) => {
    acc[key] = generateThunk(key, url);
    return acc;
  },
  {}
);

export const handleThunk = (
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<any, void, { rejectValue: string }>,
  stateKey: string
) => {
  builder
    .addCase(thunk.pending, (state: State) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state: State, action) => {
      state.loading = false;
      state[stateKey] = action.payload;
    })
    .addCase(thunk.rejected, (state: State, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
};
