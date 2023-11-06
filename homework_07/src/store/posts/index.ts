import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI'
import { Post } from '../../api/JsonPlaceholderAPI/types'

export interface PostsState {
  posts: Post[]
  pageNumber: number
  pageCount: number
  loading: boolean
}

const initialState: PostsState = {
  posts: [],
  pageNumber: 1,
  pageCount: 1,
  loading: false,
}

export const getPosts = createAsyncThunk<{ posts: Post[]; pageNumber: number; pageCount: number }, number>(
  'posts/getPosts',
  async (pageNumber, { signal }) => {
    return await JsonPlaceholderAPI.getPosts({ pageNumber, signal })
  }
)

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        const { posts, pageNumber, pageCount } = action.payload
        state.posts = posts
        state.pageNumber = pageNumber
        state.pageCount = pageCount
        state.loading = false
      })
  },
})

export default PostsSlice.reducer
