import { redirect } from 'react-router-dom';

import JsonPlaceholderAPI
  from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI.js';

export async function editUserAction({ request, params }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)

  await JsonPlaceholderAPI.updateUser({ signal: request.signal, userId: params.userId, updates })

  return redirect(`/users/${params.userId}`)
}
