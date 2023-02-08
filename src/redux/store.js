import { configureStore } from '@reduxjs/toolkit'
import { basketReducer } from './slices/basketSlice'
import { REDUX_LS_KEY } from './contants'
import { filterReducer } from './slices/filterSlice'
import { userReducer } from './slices/userSlice'
import { getInitState } from './initState'
// import { getInitState } from './initState'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    basket: basketReducer,
    user: userReducer,
  },
  preloadedState: getInitState(),
})

store.subscribe(() => {
  window.localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})
