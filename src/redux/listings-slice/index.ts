import { Listing } from '@/utils/interfaces';
import { createSlice } from '@reduxjs/toolkit';

export interface ListingsState {
  listings: Listing[];
}

const initialState: ListingsState = {
  listings: [],
}

export const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    getListings: (state) => {
        return state;
    }
  },
})

// Action creators are generated for each case reducer function
export const { getListings } = listingsSlice.actions

export default listingsSlice.reducer