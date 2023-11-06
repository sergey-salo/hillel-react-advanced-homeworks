import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI'
import { Photo } from '../../api/JsonPlaceholderAPI/types'

export interface PhotosState {
  photos: Photo[]
  loading: boolean
}

const initialState: PhotosState = {
  photos: [],
  loading: false,
}

export const getPhotos = createAsyncThunk<Photo[], void>('photos/getPhotos', async (_, { signal }) => {
  return await JsonPlaceholderAPI.getPhotos({ signal })
})

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPhotos.pending, (state) => {
        state.loading = true
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.photos = action.payload
        state.loading = false
      })
  },
})

export default photosSlice.reducer
