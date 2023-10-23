import { Link, Outlet } from 'react-router-dom'

import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'

import classNames from './RootLayout.module.css'
import { Footer } from '../../components/Footer/Footer.jsx'

const HEADER_SX = {
  flexGrow: 1,
}

const RootLayout = () => {
  return (
    <div className={classNames.layout}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={HEADER_SX}>
            React-Router + Material-UI
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Photos
          </Button>
          <Button component={Link} to="posts" color="inherit">
            Posts
          </Button>
          <Button component={Link} to="comments" color="inherit">
            Comments
          </Button>
          <Button component={Link} to="users" color="inherit">
            Users
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classNames.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}
export { RootLayout }
