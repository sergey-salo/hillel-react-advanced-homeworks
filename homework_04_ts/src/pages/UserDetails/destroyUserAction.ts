import type { LoaderFunction } from 'react-router-dom'
import { redirect } from 'react-router-dom'

import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI'

export const destroyUserAction = async ({
  params: { userId },
  request: { signal },
}: Parameters<LoaderFunction>[number]) => {
  await JsonPlaceholderAPI.deleteUser({ signal, userId: Number(userId) })

  return redirect('/users')
}
