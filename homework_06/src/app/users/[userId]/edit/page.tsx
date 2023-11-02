'use client'
import { Box, Button, Card, CardContent, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material'
import JsonPlaceholderAPI from '@/api/JsonPlaceholderAPI/JsonPlaceholderAPI';
import { User } from '@/api/JsonPlaceholderAPI/types';
import { useRouter } from 'next/navigation';
import React, { FormEventHandler, useCallback, useEffect, useState } from 'react';

interface EditUserProps {
  params: {
    userId: string
  }
}

const EditUser = ({params: {userId}}: EditUserProps) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchUser = async () => {
      try {
        const userData = await JsonPlaceholderAPI.getUser({
          signal: controller.signal,
          userId: Number(userId)
        })
        setUser(userData)
      }
      catch (ex) {
        if (!controller.signal.aborted) {
          console.log(ex);
        }
      }
    }

    fetchUser().then()

    return() => {
      controller.abort()
    }
  }, [userId])

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement);
    const updates = Object.fromEntries(formData)

    await JsonPlaceholderAPI.updateUser({ userId: Number(userId), updates})

    router.replace(`/users/${userId}`, {scroll: true})
  },
    [userId, router])

  if (!user) {
    return null
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Edit User
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput id="name" name="name" label="Name" fullWidth defaultValue={user.name} />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <OutlinedInput id="email" name="email" label="E-mail" fullWidth defaultValue={user.email} required />
              </FormControl>
            </Box>
            <Button variant={'contained'} type="submit" color={'primary'}>
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default EditUser;
