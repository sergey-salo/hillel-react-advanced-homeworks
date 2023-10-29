import { useLoaderData } from 'react-router-dom'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

import { Comment } from '../../api/JsonPlaceholderAPI/types'

interface Comments {
  comments: Comment[]
  postName: string
}

const Comments = () => {
  const {
    comments,
    postName,
    // postId
  } = useLoaderData() as Comments

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Comments
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Typography
              variant="h5"
              // component={Link} to={`/posts/${postId}`}
            >
              {postName}
            </Typography>
            {comments.map((comment) => (
              <Card
                key={comment.id}
                // variant="soft"
                // variant="outlined"
                color="text.secondary">
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    // level="title-md"
                  >
                    {comment.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {comment.body}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                    Author email: {comment.email}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export { Comments }
