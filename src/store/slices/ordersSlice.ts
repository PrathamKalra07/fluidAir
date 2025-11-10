// src/store/slices/ordersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllAccountOrder } from '../../api/orders.api';

type OrdersState = {
  orders: Record<string, any>[];
  loading: boolean;
  error: string | null;
};

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

// Async thunk to fetch orders from Salesforce
export const fetchOrders = createAsyncThunk<
  Record<string, any>[], // Return type
  { token: string; account: Record<string, any> } // Arg type
>(
  'orders/fetchOrders',
  async ({ token, account }, { rejectWithValue }) => {
    try {
      const ordersData = await getAllAccountOrder(token, account);
      return ordersData;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch orders');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
