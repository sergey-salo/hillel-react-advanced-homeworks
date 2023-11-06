import { capitalize } from 'lodash'

import { JSON_PLACEHOLDER_BASE_URL } from '../../constants/constants'
import { API } from '../API/API'
import { Comment, FetchArgs, Photo, Post, User } from './types'

class JsonPlaceholderAPI extends API {
  // Photos
  async getPhotos({ signal }: FetchArgs) {
    const response = await this.fetch<Photo[]>({ path: 'photos', signal })

    return response.slice(0, 20)
  }

  // Users
  async getUsers({ signal }: FetchArgs) {
    return await this.fetch<User[]>({ path: 'users', signal })
  }

  async getUser({ signal, userId }: FetchArgs) {
    return await this.fetch<User>({ path: `users/${userId}`, signal })
  }

  async deleteUser({ signal, userId }: FetchArgs) {
    return await this.fetch({ path: `users/${userId}`, signal, method: 'DELETE' })
  }

  async updateUser({ signal, userId, updates }: FetchArgs) {
    return await this.fetch<User>({ path: `users/${userId}`, signal, method: 'PATCH', body: updates })
  }

  // Posts
  async getPosts({ signal, pageNumber = 1 }: FetchArgs) {
    const [responsePosts, responseUsers] = await Promise.all([
      this.fetch<Post[]>({ path: 'posts', signal }),
      this.fetch<User[]>({ path: 'users', signal }),
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

  // Comments
  async getComments({ signal, postId }: FetchArgs) {
    const [responseComments, responsePost]: [Comment[], Post] = await Promise.all([
      this.fetch<Comment[]>({ path: `comments?postId=${postId}`, signal }),
      this.fetch<Post>({ path: `posts/${postId}`, signal }),
    ])

    const comments = responseComments.map((comment) => ({
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

  // Additional methods
  getUserNameById(users: User[], userId: number) {
    const user = users.find(({ id }) => id === userId)
    return user ? user.name : 'User unknown'
  }
}

export default new JsonPlaceholderAPI(JSON_PLACEHOLDER_BASE_URL)
