import {API_URI} from '../utils/const.js';
import Post from '../models/Post.js';
import {renderPictures, showAlert} from '../helpers/render.js';
import NoContentException from '../exceptions/NoContentException.js';
import PostNotSentException from '../exceptions/PostNotSentException.js';

class ApiService {
  /**
   * Fetch posts data from htmlacademy api && render them
   *
   * @param {string} filter
   *
   * @throws NoContentException
   */
  async getPosts(filter) {
    await fetch(`${API_URI}/data`)
      .then((response) => {
        if (!response.ok) {
          throw new NoContentException();
        }

        response.json()
          .then((posts) => {
            const _posts = posts.map((post) => {
              if (post.id === undefined) {
                throw new NoContentException();
              }

              return new Post(post.id, post.url, post.description, post.likes, post.comments);
            });

            renderPictures(_posts, filter);
          });
      })
      .catch((error) => showAlert(true, error.message));
  }

  /**
   * Send new post to server
   *
   * @param {FormData} data
   * @returns {Promise<any>}
   * @throws {PostNotSentException}
   */
  async createPost(data) {
    await fetch(API_URI, {
      method: 'POST',
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new PostNotSentException();
        }
      });
  }
}

export default ApiService;
