import { Form, useLoaderData } from 'react-router-dom'

import { Box, Button, Card, CardContent, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material'

const EditUser = () => {
  const user = useLoaderData()

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Edit User
      </Typography>
      <Card>
        <CardContent>
          <Form method="patch">
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
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export { EditUser }
