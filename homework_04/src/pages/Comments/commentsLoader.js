// eslint-disable-next-line prettier/prettier
import JsonPlaceholderAPI
  from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI.js';

export const commentsLoader = async ({ params: { postId }, request: { signal } }) => {
  return await JsonPlaceholderAPI.getComments({ signal, postId })
}
