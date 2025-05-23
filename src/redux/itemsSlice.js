import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  otherCosts: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    updateItem(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    addOtherCost(state, action) {
      state.otherCosts.push(action.payload);
    },
    updateOtherCost(state, action) {
      const index = state.otherCosts.findIndex(cost => cost.id === action.payload.id);
      if (index !== -1) {
        state.otherCosts[index] = action.payload;
      }
    },
    deleteOtherCost(state, action) {
      state.otherCosts = state.otherCosts.filter(cost => cost.id !== action.payload);
    },
  },
});

export const {
  addItem,
  updateItem,
  deleteItem,
  addOtherCost,
  updateOtherCost,
  deleteOtherCost,
} = itemsSlice.actions;
export default itemsSlice.reducer;
