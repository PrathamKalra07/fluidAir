// // src/store/slices/ordersSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAllAccountOrder, getStatusPicklistValue } from '../../api/orders.api';

// type OrdersState = {
//   orders: Record<string, any>[];
//   loading: boolean;
//   error: string | null;
// };

// const initialState: OrdersState = {
//   orders: [],
//   loading: false,
//   error: null,
// };

// // Async thunk to fetch orders from Salesforce
// export const fetchOrders = createAsyncThunk<
//   Record<string, any>[], // Return type
//   { token: string; account: Record<string, any> } // Arg type
// >(
//   'orders/fetchOrders',
//   async ({ token, account }, { rejectWithValue }) => {
//     try {
//       const ordersData = await getAllAccountOrder(token, account);
//       const orderCategories = await getStatusPicklistValue(token); 
//       return {ordersData, orderCategories};
//     } catch (err: any) {
//       return rejectWithValue(err.message || 'Failed to fetch orders');
//     }
//   }
// );

// const ordersSlice = createSlice({
//   name: 'orders',
//   initialState,
//   reducers: {
//     clearOrders: (state) => {
//       state.orders = [];
//       state.orderCategories = [];
//       state.error = null;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOrders.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(fetchOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { clearOrders } = ordersSlice.actions;
// export default ordersSlice.reducer;

// src/store/slices/ordersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllAccountOrder, getStatusPicklistValue } from '../../api/orders.api';

type Order = Record<string, any>;

type PicklistValue = {
  label: string;
  value: string;
  // extend with additional fields your API returns (e.g. active, default, etc.)
};

type OrdersState = {
  orders: Order[];
  orderCategories: PicklistValue[]; // picklist values for status
  loading: boolean;
  error: string | null;
};

const initialState: OrdersState = {
  orders: [],
  orderCategories: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<
  { ordersData: Order[]; orderCategories: PicklistValue[] }, // Return type
  { token: string; account: Record<string, any> }, // Arg type
  { rejectValue: string } // rejectWithValue type
>(
  'orders/fetchOrders',
  async ({ token, account }, { rejectWithValue }) => {
    try {
      const ordersData = await getAllAccountOrder(token, account);
      const orderCategories = await getStatusPicklistValue(token);
      const categories = orderCategories.map((obj: any) => ({
        label: obj.label,
        value: obj.value
      }));
      console.log('Fetched order categories: ', categories);
      return { ordersData, orderCategories : categories };
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Failed to fetch orders');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.orderCategories = [];
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
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<{ ordersData: Order[]; orderCategories: PicklistValue[] }>) => {
          state.loading = false;
          state.orders = action.payload.ordersData;
          state.orderCategories = action.payload.orderCategories;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to fetch orders';
      });
  },
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
