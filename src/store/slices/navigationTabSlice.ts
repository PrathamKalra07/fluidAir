// src/store/slices/navigationTabSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NavigationState = {
  activeTab: 'profile' | 'orders' | 'help' | 'contact';
};

const initialState: NavigationState = { activeTab: 'profile' };

const navigationTabSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<NavigationState['activeTab']>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = navigationTabSlice.actions;
export default navigationTabSlice.reducer;
