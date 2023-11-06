import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RootLayout } from '../layouts/RootLayout/RootLayout'
import { EditUser } from '../pages/EditUser/EditUser'
import { PageNotFound } from '../pages/PageNotFound/PageNotFound'
import { Photos } from '../pages/Photos/Photos'
// import { Comments } from '../pages/Comments/Comments'
import { Posts } from '../pages/Posts/Posts'
import { UserDetails } from '../pages/UserDetails/UserDetails'
import { Users } from '../pages/Users/Users'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Photos />,
      },
      {
        path: 'posts',
        element: <Posts />,
      },
      {
        path: 'comments/:postId',
        // element: <Comments />,
        async lazy() {
          const { Comments } = await import('../pages/Comments/Comments')
          return { Component: Comments }
        },
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'users/:userId',
        element: <UserDetails />,
      },
      {
        path: 'users/:userId/destroy',
      },
      {
        path: 'users/:userId/edit',
        element: <EditUser />,
      },
    ],
  },
])

const Router = () => <RouterProvider router={router} />

export { Router }
