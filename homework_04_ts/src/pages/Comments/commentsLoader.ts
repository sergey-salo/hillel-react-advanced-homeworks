import type { LoaderFunction } from 'react-router-dom'

import { isNaN } from 'lodash'

import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI'

export const commentsLoader = async ({
  params: { postId },
  request: { signal },
}: Parameters<LoaderFunction>[number]) => {
  const postIdParam = !isNaN(Number(postId)) ? Number(postId) : 1
  return await JsonPlaceholderAPI.getComments({ signal, postId: postIdParam })
}
