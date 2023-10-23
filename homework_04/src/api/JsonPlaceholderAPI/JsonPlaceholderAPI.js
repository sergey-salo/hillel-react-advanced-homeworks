import { capitalize } from 'lodash';

import { JSON_PLACEHOLDER_BASE_URL } from '../../constants/index.js';
import { API } from '../API/API';

class JsonPlaceholderAPI extends API {
  constructor(url) {
    super(url)
  }

  // Photos
  async getPhotos({ signal }) {
    const response = await this.fetch({ path: 'photos', signal })

    return response.slice(0, 20)
  }

  // Users
  async getUsers({ signal }) {
    return await this.fetch({ path: 'users', signal })
  }

  async getUser({ signal, userId }) {
    return await this.fetch({ path: `users/${userId}`, signal })
  }

  async deleteUser({ signal, userId }) {
    return await this.fetch({ path: `users/${userId}`, signal, method: 'DELETE' })
  }

  // Posts
  async getPosts({ signal, pageNumber }) {
    const [responsePosts, responseUsers] = await Promise.all([
      this.fetch({ path: 'posts', signal }),
      this.fetch({ path: 'users', signal }),
    ])

    const countRecordsOnPage = 20
    const startTakenRecords = (pageNumber - 1) * 20
    const endTakenRecords = startTakenRecords + countRecordsOnPage
    const rawPosts = responsePosts.slice(startTakenRecords, endTakenRecords)
    const posts = rawPosts.map((item) => ({
      ...item,
      title: capitalize(item.title),
      body: capitalize(item.body),
      userName: this.getUserNameById(responseUsers, item.userId),
    }))

    const pageCount = responsePosts.length / countRecordsOnPage

    return {
      posts,
      pageNumber,
      pageCount,
    }
  }

  getUserNameById(users, userId) {
    const user = users.find(({ id }) => id === userId)
    return user ? user.name : 'User unknown'
  }

  // Comments
  async getComments({ signal, postId = 1 }) {
    const [responseComment, responsePost] = await Promise.all([
      this.fetch({ path: `comments?postId=${postId}`, signal }),
      this.fetch({ path: `posts/${postId}`, signal }),
    ])

    const comments = responseComment.map((comment) => ({
      ...comment,
      name: capitalize(comment.name),
      body: capitalize(comment.body),
    }))

    return {
      comments,
      postName: responsePost ? capitalize(responsePost.title) : 'No post title',
      postId,
    }
  }
}

export default new JsonPlaceholderAPI(JSON_PLACEHOLDER_BASE_URL)
