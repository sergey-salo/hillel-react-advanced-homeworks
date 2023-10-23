import { Link } from 'react-router-dom'

import { Typography } from '@mui/material'

const PageNotFound = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Page not found
      </Typography>
      <p>The page you are looking does not exist.</p>
      <Link to="/">Go to the home page</Link>
    </div>
  )
}

export { PageNotFound }
