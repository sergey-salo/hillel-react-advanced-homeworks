import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI'
import { User } from '../../api/JsonPlaceholderAPI/types'

export interface UsersState {
  users: User[]
  loading: boolean
}

const initialState: UsersState = {
  users: [],
  loading: false,
}

export const getUsers = createAsyncThunk<User[], void>('users/getUsers', async (_, { signal }) => {
  return await JsonPlaceholderAPI.getUsers({ signal })
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.loading = false
      })
  },
})

export default usersSlice.reducer
