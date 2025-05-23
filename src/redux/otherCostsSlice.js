import { createSlice } from '@reduxjs/toolkit';

const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState: [],
  reducers: {
    setOtherCosts: (state, action) => action.payload,
    addOtherCost: (state, action) => {
      state.push(action.payload);
    },
    updateOtherCost: (state, action) => {
      const index = state.findIndex(cost => cost.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteOtherCost: (state, action) => {
      return state.filter(cost => cost.id !== action.payload);
    },
  },
});

export const { setOtherCosts, addOtherCost, updateOtherCost, deleteOtherCost } = otherCostsSlice.actions;
export default otherCostsSlice.reducer;
