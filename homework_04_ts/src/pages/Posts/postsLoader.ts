import type { LoaderFunction } from 'react-router-dom'

import { isNaN, isNil } from 'lodash'

import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI'

export const postsLoader = async ({ request: { signal, url } }: Parameters<LoaderFunction>[number]) => {
  const page = new URL(url).searchParams.get('page')
  const pageNumber = !isNil(page) && !isNaN(+page) ? +page : 1
  return await JsonPlaceholderAPI.getPosts({ signal, pageNumber })
}
