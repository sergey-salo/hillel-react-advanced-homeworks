import Link  from 'next/link'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import JsonPlaceholderAPI from '@/api/JsonPlaceholderAPI/JsonPlaceholderAPI';

export default async function Users() {
  const users = await JsonPlaceholderAPI.getUsers({
    signal: new AbortController().signal,
    cache: 'no-cache',
  })

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id} component={Link} href={`/users/${user.id}`}>
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
