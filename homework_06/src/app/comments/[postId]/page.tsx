import JsonPlaceholderAPI from '@/api/JsonPlaceholderAPI/JsonPlaceholderAPI';
import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

interface CommentsParams {
  params: {
    postId: string
  }
}

async function Comments({ params: { postId }}: CommentsParams) {
  const { comments, postName } = await JsonPlaceholderAPI.getComments({
    signal: new AbortController().signal,
    postId: Number(postId),
  })

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Comments
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Typography variant="h5">
              {postName}
            </Typography>
            {comments.map((comment) => (
              <Card
                key={comment.id}
                color="text.secondary">
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
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
  );
}

export default Comments;
