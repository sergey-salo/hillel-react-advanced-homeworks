import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI.js'

export const usersLoader = async ({ request: { signal } }) => {
  return await JsonPlaceholderAPI.getUsers({ signal })
}
