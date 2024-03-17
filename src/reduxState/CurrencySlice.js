import { createSlice } from '@reduxjs/toolkit';
import { getBaseCurrency } from './operations';

export const currencySlice = createSlice({
  name: 'currency',
  initialState: { baseCurrency: '' },
  extraReducers: builder => {
    builder.addCase(getBaseCurrency.fulfilled, (state, action) => {
      state.baseCurrency = action.payload;
    });
  },
  reducers: {
    setDefaultCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
});
export const { setDefaultCurrency } = currencySlice.actions;
export const selectBaseCurrency = state => state.currency.baseCurrency;
