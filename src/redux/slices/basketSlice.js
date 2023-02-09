/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const basketSlice = createSlice({
  name: 'basket',
  initialState: initState.basket,
  reducers: {
    basketAdd(state, actions) {
      const product = {
        id: actions.payload,
        count: 1,
        isChecked: false,
      }
      state.push(product)
    },
    basketRemove(state, actions) {
      return state.filter((item) => item.id !== actions.payload)
    },
  },
})

export const { basketAdd, basketRemove } = basketSlice.actions
export const getBasketSelector = (state) => state.basket
export const basketReducer = basketSlice.reducer
