import type { LoaderFunction } from 'react-router-dom'

import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI'

export const userDetailsLoader = async ({
  params: { userId },
  request: { signal },
}: Parameters<LoaderFunction>[number]) => {
  if (!userId) throw new Error('No user ID provided')

  return await JsonPlaceholderAPI.getUser({ signal, userId: Number(userId) })
}
