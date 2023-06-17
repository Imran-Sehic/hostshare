import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface FiltersState {
  dateIn: string;
  dateOut: string;
  search: string;
}

enum LocalStorageFilterKeys {
  SEARCH = 'search',
  DATE_IN = 'dateIn',
  DATE_OUT = 'dateOut',
}

const isClient = typeof window !== 'undefined';

const initialState: FiltersState = {
  dateIn:
    (isClient && localStorage.getItem(LocalStorageFilterKeys.DATE_IN)) || '',
  dateOut:
    (isClient && localStorage.getItem(LocalStorageFilterKeys.DATE_OUT)) || '',
  search:
    (isClient && localStorage.getItem(LocalStorageFilterKeys.SEARCH)) || '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    getFilters: state => {
      return state;
    },
    setSearch(state, action: PayloadAction<string>) {
      localStorage.setItem(LocalStorageFilterKeys.SEARCH, action.payload);
      state.search = action.payload;
    },
    setDateIn(state, action: PayloadAction<string>) {
      localStorage.setItem(LocalStorageFilterKeys.DATE_IN, action.payload);
      state.dateIn = action.payload;
    },
    setDateOut(state, action: PayloadAction<string>) {
      localStorage.setItem(LocalStorageFilterKeys.DATE_OUT, action.payload);
      state.dateOut = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getFilters, setDateIn, setDateOut, setSearch } =
  filtersSlice.actions;

export default filtersSlice.reducer;
