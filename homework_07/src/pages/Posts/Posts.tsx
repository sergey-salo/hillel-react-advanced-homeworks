import { useEffect } from 'react'

import { isNaN, isNil } from 'lodash'
import { Link, useSearchParams } from 'react-router-dom'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from '@mui/material'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getPosts } from '../../store/posts'

const Posts = () => {
  const { posts, pageNumber, pageCount, loading } = useAppSelector((state) => state.posts)
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const page = searchParams.get('page')
    const pageNumber = !isNil(page) && !isNaN(+page) ? +page : 1
    dispatch(getPosts(pageNumber))
  }, [searchParams])

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Stack spacing={2}>
        <Pagination
          page={pageNumber}
          count={pageCount}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem component={Link} to={`/posts${item.page === 1 ? '' : `?page=${item.page}`}`} {...item} />
          )}
        />
      </Stack>
      <Box>
        {loading ? (
          <Typography variant="h5">Loading...</Typography>
        ) : (
          posts.map((post) => (
            <Accordion key={post.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${post.id}}a-content`}
                id={`panel${post.id}}a-header`}>
                <Typography>{post.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{post.body}</Typography>
                <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                  Author: {post.userName}
                </Typography>
                <Typography component={Link} to={`/comments/${post.id}`}>
                  Comments
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>
    </>
  )
}

export { Posts }
