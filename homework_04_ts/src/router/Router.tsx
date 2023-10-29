import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RootLayout } from '../layouts/RootLayout/RootLayout'
// import { Comments } from '../pages/Comments/Comments'
import { commentsLoader } from '../pages/Comments/commentsLoader'
import { EditUser } from '../pages/EditUser/EditUser'
import { editUserAction } from '../pages/EditUser/editUserAction'
import { PageNotFound } from '../pages/PageNotFound/PageNotFound'
import { Photos } from '../pages/Photos/Photos'
import { photosLoader } from '../pages/Photos/photosLoader'
// import { Posts } from '../pages/Posts/Posts'
import { postsLoader } from '../pages/Posts/postsLoader'
import { UserDetails } from '../pages/UserDetails/UserDetails'
import { destroyUserAction } from '../pages/UserDetails/destroyUserAction'
import { userDetailsLoader } from '../pages/UserDetails/userDetailsLoader'
import { Users } from '../pages/Users/Users'
import { usersLoader } from '../pages/Users/usersLoader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Photos />,
        loader: photosLoader,
      },
      {
        path: 'posts',
        // element: <Posts />,
        loader: postsLoader,
        // 1
        // lazy: () => import('../pages/Posts/Posts'),
        // 2
        // lazy: async () => {
        //   const { Posts } = await import('../pages/Posts/Posts')
        //   return { Component: Posts }
        // },
        // 3
        async lazy() {
          const { Posts } = await import('../pages/Posts/Posts')
          return { Component: Posts }
        },
      },
      {
        path: 'comments',
        // element: <Comments />,
        loader: commentsLoader,
        lazy: async () => {
          const { Comments } = await import('../pages/Comments/Comments')
          return { Component: Comments }
        },
      },
      {
        path: 'comments/:postId',
        // element: <Comments />,
        loader: commentsLoader,
        async lazy() {
          const { Comments } = await import('../pages/Comments/Comments')
          return { Component: Comments }
        },
      },
      {
        path: 'users',
        element: <Users />,
        loader: usersLoader,
      },
      {
        path: 'users/:userId',
        element: <UserDetails />,
        loader: userDetailsLoader,
      },
      {
        path: 'users/:userId/destroy',
        action: destroyUserAction,
      },
      {
        path: 'users/:userId/edit',
        element: <EditUser />,
        loader: userDetailsLoader,
        action: editUserAction,
      },
    ],
  },
])

const Router = () => <RouterProvider router={router} />

export { Router }
