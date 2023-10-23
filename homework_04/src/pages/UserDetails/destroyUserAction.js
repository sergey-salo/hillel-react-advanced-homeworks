import { redirect } from 'react-router-dom'

import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI.js'

export const destroyUserAction = async ({ params: { userId }, request: { signal } }) => {
  await JsonPlaceholderAPI.deleteUser({ signal, userId })

  return redirect('/users')
}
