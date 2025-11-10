import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserSessionId } from '../../api/restUtils';
import { getAccountDetails, getAccountProducts } from '../../api/orders.api';
import { fetchOrders } from './ordersSlice'; 

type AccountState = {
  account: Record<string, any> | null;
  products: Record<string, any>[];
  sessionId: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AccountState = {
  account: null,
  products: [],
  sessionId: null,
  loading: false,
  error: null,
};

export const fetchAccountData = createAsyncThunk(
  'account/fetchAccountData',
  async (userInfo: { email: string; name: string }, { dispatch }) => {
    try {
      const sessionRes = await fetchUserSessionId();
      const token = sessionRes.data;
      const accountData = await getAccountDetails(token, userInfo);
      const productsData = await getAccountProducts(token, accountData);

      dispatch(fetchOrders({ token, account: accountData }));

      return { account: accountData, products: productsData, sessionId: token };
    } catch (error: any) {
      throw error;
    }
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountData.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload.account;
        state.products = action.payload.products;
        state.sessionId = action.payload.sessionId;
      })
      .addCase(fetchAccountData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch account';
      });
      
  },
});

export default accountSlice.reducer;
