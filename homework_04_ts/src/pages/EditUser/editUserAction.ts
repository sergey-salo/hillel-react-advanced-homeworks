import type { LoaderFunction } from 'react-router-dom'
import { redirect } from 'react-router-dom'

import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI'

export async function editUserAction({ request, params }: Parameters<LoaderFunction>[number]) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)

  if (!params.userId) throw new Error('No user ID provided')

  await JsonPlaceholderAPI.updateUser({ signal: request.signal, userId: Number(params.userId), updates })

  return redirect(`/users/${params.userId}`)
}
