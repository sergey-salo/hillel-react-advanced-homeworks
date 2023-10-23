/* eslint-disable prettier/prettier */
import {
  isNaN,
  isNil,
} from 'lodash';

import JsonPlaceholderAPI
  from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI.js';

export const postsLoader = async ({ request: { signal, url } }) => {
  const page = new URL(url).searchParams.get('page')
  const pageNumber = !isNil(page) && !isNaN(+page) ? +page : 1

  return await JsonPlaceholderAPI.getPosts({ signal, pageNumber })
}
