import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RootLayout } from '../layouts/RootLayout/RootLayout.jsx'
// import { Comments } from '../pages/Comments/Comments.jsx'
import { commentsLoader } from '../pages/Comments/commentsLoader.js'
import { EditUser } from '../pages/EditUser/EditUser.jsx'
import { editUserAction } from '../pages/EditUser/editUserAction.js'
import { PageNotFound } from '../pages/PageNotFound/PageNotFound.jsx'
import { Photos } from '../pages/Photos/Photos.jsx'
import { photosLoader } from '../pages/Photos/photosLoader.js'
// import { Posts } from '../pages/Posts/Posts.jsx'
import { postsLoader } from '../pages/Posts/postsLoader.js'
import { destroyUserAction } from '../pages/UserDetails/destroyUserAction.js'
import { UserDetails } from '../pages/UserDetails/UserDetails.jsx'
import { userDetailsLoader } from '../pages/UserDetails/userDetailsLoader.js'
import { Users } from '../pages/Users/Users.jsx'
import { usersLoader } from '../pages/Users/usersLoader.js'

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
        // lazy: () => import('../pages/Posts/Posts.jsx'),
        // 2
        // lazy: async () => {
        //   const { Posts } = await import('../pages/Posts/Posts.jsx')
        //   return { Component: Posts }
        // },
        // 3
        async lazy() {
          const { Posts } = await import('../pages/Posts/Posts.jsx')
          return { Component: Posts }
        },
      },
      {
        path: 'comments',
        // element: <Comments />,
        loader: commentsLoader,
        lazy: async () => {
          let { Comments } = await import('../pages/Comments/Comments.jsx')
          return { Component: Comments }
        },
      },
      {
        path: 'comments/:postId',
        // element: <Comments />,
        loader: commentsLoader,
        async lazy() {
          let { Comments } = await import('../pages/Comments/Comments.jsx')
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
