import { Comment } from '@/api/JsonPlaceholderAPI/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI'

export interface CommentsState {
  postName: string
  comments: Comment[]
}

const initialState: CommentsState = {
  postName: '',
  comments: [],
}

export const getComments = createAsyncThunk<CommentsState, string>(
  'comments/getComments',
  async (postId: string, { signal }) => {
    return await JsonPlaceholderAPI.getComments({ postId: Number(postId), signal })
  }
)

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsData: initialState,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true
      })
      .addCase(getComments.fulfilled, (state, action) => {
        const { postName, comments } = action.payload
        state.commentsData.postName = postName
        state.commentsData.comments = comments
        state.loading = false
      })
  },
})

export default commentsSlice.reducer
