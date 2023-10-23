import { Link, useLoaderData } from 'react-router-dom'

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

const Posts = () => {
  const { posts, pageNumber, pageCount } = useLoaderData()

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
        {posts.map((post) => (
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
        ))}
      </Box>
    </>
  )
}

export { Posts }
