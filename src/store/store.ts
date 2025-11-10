// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import ordersReducer from './slices/ordersSlice';
import navigationTabReducer from './slices/navigationTabSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    orders: ordersReducer,
    navigation: navigationTabReducer,
  },
  devTools: true, // ✅ enables Redux DevTools automatically
});

// store.subscribe(() => {
//   const state = store.getState();
//   console.log('🧠 Redux Store Updated:', JSON.stringify(state, null, 2));
// });

// ✅ For TypeScript convenience
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
