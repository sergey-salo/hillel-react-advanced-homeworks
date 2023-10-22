import { Form, Link, useLoaderData } from 'react-router-dom'

import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'

const FIELDS = [
  { name: 'Name', key: 'name' },
  { name: 'Username', key: 'username' },
  { name: 'Email', key: 'email' },
  { name: 'Phone', key: 'phone' },
  { name: 'Website', key: 'website' },
]

const UserDetails = () => {
  const user = useLoaderData()
  return (
    <>
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
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
        <Form
          method="delete"
          action="destroy"
          onSubmit={(event) => {
            if (!confirm('Please confirm that you want to delete this user.')) {
              event.preventDefault()
            }
          }}>
          <Button variant="contained" color="error" type="submit">
            Delete User
          </Button>
        </Form>
      </Box>
    </>
  )
}

export { UserDetails }
