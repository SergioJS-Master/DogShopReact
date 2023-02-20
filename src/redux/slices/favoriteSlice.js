import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initState.favorite,
  reducers: {
    favoriteAdd(state, actions) {
      const product = {
        id: actions.payload,
        count: 1,
        isChecked: false,
      }
      state.push(product)
    },
    favoriteRemove(state, actions) {
      return state.filter((item) => item.id !== actions.payload)
    },
  },
})

export const { favoriteAdd, favoriteRemove } = favoriteSlice.actions
export const getFavoriteSelector = (state) => state.favorite
export const favoriteReducer = favoriteSlice.reducer
