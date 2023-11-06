import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI'
import { User } from '../../api/JsonPlaceholderAPI/types'

export interface UserState {
  user: User | null
  loading: boolean
}

const initialState: UserState = {
  user: null,
  loading: false,
}

export const getUser = createAsyncThunk<User, number>('user/getUser', async (userId, { signal }) => {
  return await JsonPlaceholderAPI.getUser({ userId, signal })
})

export const editUser = createAsyncThunk<User, { userId: number; updates: Record<string, unknown> | undefined }>(
  'user/editUser',
  async ({ userId, updates }, { signal }) => {
    return await JsonPlaceholderAPI.updateUser({ signal, userId, updates })
  }
)

export const deleteUser = createAsyncThunk<void, number>('user/deleteUser', async (userId, { signal }) => {
  await JsonPlaceholderAPI.deleteUser({ userId, signal })
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null
        state.loading = false
      })
  },
})

export default userSlice.reducer
