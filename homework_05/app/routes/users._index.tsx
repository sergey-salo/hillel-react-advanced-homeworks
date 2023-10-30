import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'

import JsonPlaceholderAPI from '~/api/JsonPlaceholderAPI/JsonPlaceholderAPI'

export const meta: MetaFunction = () => {
  return [
    { title: "Users (homework_05)" },
  ]
}

export const loader = async ({ request: { signal } }: Parameters<LoaderFunction>[number]) => {
  return await JsonPlaceholderAPI.getUsers({ signal })
}

export default function UsersPage()  {
  const users = useLoaderData<typeof loader>()

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id} component={Link} to={`/users/${user.id}`}>
            <ListItemAvatar>
              <Avatar alt={user.name} src={`https://mui.com/static/images/avatar/${user.id}.jpg`} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </>
  )
}
