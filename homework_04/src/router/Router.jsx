import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RootLayout } from '../layouts/RootLayout/RootLayout.jsx'
import { Comments } from '../pages/Comments/Comments.jsx'
import { PageNotFound } from '../pages/PageNotFound/PageNotFound.jsx'
import { Photos } from '../pages/Photos/Photos.jsx'
import { photosLoader } from '../pages/Photos/photosLoader.js'
import { Posts } from '../pages/Posts/Posts.jsx'
import { UserDetails } from '../pages/UserDetails/UserDetails.jsx'
import { destroyUserAction } from '../pages/UserDetails/destroyUserAction.js'
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
        element: <Posts />,
      },
      {
        path: 'comments',
        element: <Comments />,
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
    ],
  },
])

const Router = () => <RouterProvider router={router} />

export { Router }
