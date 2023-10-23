import JsonPlaceholderAPI from '../../api/JsonPlaceholderAPI/JsonPlaceholderAPI.js'

export const photosLoader = async ({ request: { signal } }) => {
  return await JsonPlaceholderAPI.getPhotos({ signal })
}
