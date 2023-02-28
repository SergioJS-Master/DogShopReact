/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    userAdd(state, actions) {
      return {
        ...state,
        _id: actions.payload.data._id,
        name: actions.payload.data.name,
        email: actions.payload.data.email,
        group: actions.payload.data.group,
        token: actions.payload.token,
      }
    },
    removeUser() {
      return initState.user
    },
  },
})

export const { userAdd, removeUser } = userSlice.actions
export const userReducer = userSlice.reducer
export const getTokenSelector = (state) => state.user.token
export const getUserIdSelector = (state) => state.user._id
