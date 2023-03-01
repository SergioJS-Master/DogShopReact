/* eslint-disable max-len */
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
    basketCheckboxRemove(state) {
      return state.filter((item) => item.isChecked !== true)
    },
    basketIsCkeckedOne(state, actions) {
      return state.map((item) => {
        if (item.id === actions.payload.id) {
          return {
            ...item,
            isChecked: actions.payload.isChecked,
          }
        }
        return item
      })
    },
    basketIsCheckedAllCards(state, actions) {
      state.map((product) => (product.isChecked = actions.payload))
    },
    basketIncrement(state, actions) {
      state.map((item) => {
        if (item.id === actions.payload) {
          return (item.count += 1)
        }
        return item
      })
    },
    basketDecrement(state, actions) {
      state.map((item) => {
        if (item.id === actions.payload) {
          return (item.count -= 1)
        }
        return item
      })
    },
  },
})

export const {
  basketAdd, basketRemove, basketCheckboxRemove, basketIsCkeckedOne, basketIsCheckedAllCards, basketIncrement, basketDecrement,
} = basketSlice.actions
export const getBasketSelector = (state) => state.basket
export const basketReducer = basketSlice.reducer
