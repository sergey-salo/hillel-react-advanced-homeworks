import { Link, useLoaderData } from '@remix-run/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Pagination, PaginationItem, Stack, Typography } from '@mui/material'
import _lodash from 'lodash'

import JsonPlaceholderAPI from '~/api/JsonPlaceholderAPI/JsonPlaceholderAPI'

const { isNaN, isNil } = _lodash

export const meta: MetaFunction = () => {
  return [
    { title: "Posts (homework_05)" },
  ]
}

export const loader = async ({ request: { signal, url } }: Parameters<LoaderFunction>[number]) => {
  const page = new URL(url).searchParams.get('page')
  const pageNumber = !isNil(page) && !isNaN(+page) ? +page : 1
  return await JsonPlaceholderAPI.getPosts({ signal, pageNumber })
}

export default function PostsPage()  {
  const { posts, pageNumber, pageCount } = useLoaderData<typeof loader>()

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
