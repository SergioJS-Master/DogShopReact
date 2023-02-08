import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    userAdd(state, actions) {
      return console.log(state, actions)
    },
  },
})

export const { userAdd } = userSlice.actions
export const userReducer = userSlice.reducer
export const getTokenSelector = (state) => state.user.token
