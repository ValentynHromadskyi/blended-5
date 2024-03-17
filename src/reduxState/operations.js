import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from 'service/opencagedataApi';

export const getBaseCurrency = createAsyncThunk(
  'currencygetBaseCurrency',
  async (crd, thunkApi) => {
    const state = thunkApi.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return thunkApi.rejectWithValue('We already have base currency!');
    }

    try {
      const data = await getUserInfo(crd);

      return data.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
