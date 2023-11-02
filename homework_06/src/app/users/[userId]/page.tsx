import DeleteUserForm from '@/app/users/[userId]/DeleteUserForm';
import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'
import  Link from 'next/link'
import JsonPlaceholderAPI from '@/api/JsonPlaceholderAPI/JsonPlaceholderAPI';
import { User } from '@/api/JsonPlaceholderAPI/types'
import { useCallback } from 'react'

const FIELDS = [
  { name: 'Name', key: 'name' },
  { name: 'Username', key: 'username' },
  { name: 'Email', key: 'email' },
  { name: 'Phone', key: 'phone' },
  { name: 'Website', key: 'website' },
] satisfies { name: string; key: keyof Pick<User, 'name' | 'username' | 'email' | 'phone' | 'website'> }[]

interface UserDetailsProps {
  params: {
    userId: string
  }
}

const UserDetails = async ({  params: { userId } }: UserDetailsProps) => {
  const user = await JsonPlaceholderAPI.getUser({signal: new AbortController().signal, userId: Number(userId)})

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
          <Button component={Link} variant="contained" color="primary" href={`${userId}/edit`}>
            Edit User
          </Button>
        </Box>
        <DeleteUserForm userId={userId} />
      </Box>
    </>
  )
}

export default UserDetails;
