import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './filters-slice'
import listingsReducer from './listings-slice'

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    filters: filtersReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch