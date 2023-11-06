import { useEffect } from 'react'

import { Link } from 'react-router-dom'

import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getUsers } from '../../store/users'

const Users = () => {
  const { users, loading } = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      {loading ? (
        <Typography variant="h5" gutterBottom>
          Loading...
        </Typography>
      ) : (
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
      )}
    </>
  )
}

export { Users }
