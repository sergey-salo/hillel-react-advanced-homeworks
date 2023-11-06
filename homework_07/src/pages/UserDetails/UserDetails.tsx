import { useCallback, useEffect } from 'react'

import { Form, Link, useNavigate, useParams } from 'react-router-dom'

import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'

import { User } from '../../api/JsonPlaceholderAPI/types'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { deleteUser, getUser } from '../../store/user'

const FIELDS = [
  { name: 'Name', key: 'name' },
  { name: 'Username', key: 'username' },
  { name: 'Email', key: 'email' },
  { name: 'Phone', key: 'phone' },
  { name: 'Website', key: 'website' },
] satisfies { name: string; key: keyof Pick<User, 'name' | 'username' | 'email' | 'phone' | 'website'> }[]

const UserDetails = () => {
  const { userId } = useParams()
  const { user, loading } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUser(Number(userId)))
  }, [])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (confirm('Please confirm that you want to delete this user.')) {
        dispatch(deleteUser(Number(userId)))

        navigate('/users')
      }
    },
    [userId, navigate, dispatch]
  )

  return (
    <>
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
      {loading ? (
        <Typography variant="h5" gutterBottom>
          Loading...
        </Typography>
      ) : (
        <>
          {user && (
            <Card>
              <CardContent>
                <List>
                  {FIELDS.map((field) => (
                    <ListItem key={field.key}>
                      <ListItemText primary={field.name} secondary={user[field.key]} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
          <Box mt={2} display="flex" flexDirection="row">
            <Box mr={2}>
              <Button component={Link} variant="contained" color="primary" to="edit">
                Edit User
              </Button>
            </Box>
            <Form method="delete" action="destroy" onSubmit={handleSubmit}>
              <Button variant="contained" color="error" type="submit">
                Delete User
              </Button>
            </Form>
          </Box>
        </>
      )}
    </>
  )
}

export { UserDetails }
