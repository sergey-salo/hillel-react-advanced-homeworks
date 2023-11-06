import { configureStore } from '@reduxjs/toolkit'

import commentsReducer from './comments'
import photosReducer from './photos'
import postsReducer from './posts'
import userReducer from './user'
import usersReducer from './users'

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    photos: photosReducer,
    posts: postsReducer,
    users: usersReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
