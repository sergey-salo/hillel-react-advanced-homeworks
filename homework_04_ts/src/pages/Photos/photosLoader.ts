import type { LoaderFunction } from 'react-router-dom'

import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI'

export const photosLoader = async ({ request: { signal } }: Parameters<LoaderFunction>[number]) => {
  return await JsonPlaceholderAPI.getPhotos({ signal })
}
