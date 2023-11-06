import { useCallback, useEffect } from 'react'

import { Form, useNavigate, useParams } from 'react-router-dom'

import { Box, Button, Card, CardContent, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { editUser, getUser } from '../../store/user'

const EditUser = () => {
  const navigate = useNavigate()
  const { userId } = useParams()
  const { user, loading } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUser(Number(userId)))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.target as HTMLFormElement)
      const updates = Object.fromEntries(formData)

      dispatch(
        editUser({
          userId: Number(userId),
          updates,
        })
      )

      navigate(`/users/${userId}`)
    },
    [userId, navigate, dispatch]
  )

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Edit User
      </Typography>
      <Card>
        <CardContent>
          {loading ? (
            <Typography variant="h5">Loading...</Typography>
          ) : (
            user && (
              <Form method="patch" onSubmit={handleSubmit}>
                <Box mb={2}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <OutlinedInput id="name" name="name" label="Name" fullWidth defaultValue={user.name} />
                  </FormControl>
                </Box>
                <Box mb={2}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="email">E-mail</InputLabel>
                    <OutlinedInput
                      id="email"
                      name="email"
                      label="E-mail"
                      fullWidth
                      defaultValue={user.email}
                      required
                    />
                  </FormControl>
                </Box>
                <Button variant={'contained'} type="submit" color={'primary'}>
                  Save
                </Button>
              </Form>
            )
          )}
        </CardContent>
      </Card>
    </>
  )
}

export { EditUser }
