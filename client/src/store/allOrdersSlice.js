import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  allOrders: [],
};

const allOrdersSlice = createSlice({
  name: 'allOrders',
  initialState: initialValue,
  reducers: {
    setAllOrders: (state, action) => {
      state.allOrders = [...action.payload];
    },
  },
});

export const { setAllOrders } = allOrdersSlice.actions;

export default allOrdersSlice.reducer;
