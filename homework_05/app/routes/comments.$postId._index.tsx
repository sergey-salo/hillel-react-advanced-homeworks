import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import _lodash from 'lodash'

import JsonPlaceholderAPI from '~/api/JsonPlaceholderAPI/JsonPlaceholderAPI'

const { isNaN } = _lodash

export const meta: MetaFunction = () => {
  return [
    { title: "Comments (homework_05)" },
  ];
};

export const loader = async ({
  params: { postId },
  request: { signal },
}: Parameters<LoaderFunction>[number]) => {
  const postIdParam = !isNaN(Number(postId)) ? Number(postId) : 1
  return await JsonPlaceholderAPI.getComments({ signal, postId: postIdParam })
}

export default function CommentsPage()  {
  const {
    comments,
    postName,
  } = useLoaderData<typeof loader>()

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Comments
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Typography variant="h5">{postName}</Typography>
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
  )
}
