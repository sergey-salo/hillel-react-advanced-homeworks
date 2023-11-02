import PaginationSection from '@/app/posts/Pagination';
import Link from 'next/link'
import JsonPlaceholderAPI from '@/api/JsonPlaceholderAPI/JsonPlaceholderAPI';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material'
import { isNaN, isNil } from 'lodash'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material/'

interface PostsParams {
  searchParams: {
    page: string
  }
}

export default async function Posts({ searchParams: { page} }: PostsParams) {
  const{ posts, pageNumber, pageCount } = await JsonPlaceholderAPI.getPosts( {
    pageNumber: !isNil(page) && !isNaN(+page) ? Number(page) : 1
  })

   return (
    <>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Stack spacing={2}>
        <PaginationSection pageNumber={pageNumber} pageCount={pageCount} />
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
              <Typography component={Link} href={`/comments/${post.id}`}>
                Comments
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  )
}
