import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getComments } from '../../store/comments'

const Comments = () => {
  const { postId } = useParams()
  const {
    commentsData: { comments, postName },
    loading,
  } = useAppSelector((state) => state.comments)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getComments(postId ? postId : '1'))
  }, [])

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Comments
      </Typography>
      {loading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <Typography variant="h5">{postName}</Typography>
              {comments.map((comment) => (
                <Card key={comment.id} color="text.secondary">
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
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
      )}
    </>
  )
}

export { Comments }
