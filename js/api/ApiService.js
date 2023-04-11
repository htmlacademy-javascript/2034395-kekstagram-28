import {API_URI} from '../utils/const.js';
import Post from '../models/Post.js';
import {renderPictures, showAlert} from '../helpers/render.js';
import NoContentException from '../exceptions/NoContentException.js';
import PostNotSentException from '../exceptions/PostNotSentException.js';

class ApiService {
  /**
   * Fetch posts data from htmlacademy api && render them
   *
   * @throws NoContentException
   */
  async getPosts() {
    await fetch(`${API_URI}/data`)
      .then((data) => {
        data.json()
          .then((posts) => {
            const _posts = posts.map((post) => {
              if (post.id === undefined) {
                throw new NoContentException();
              }

              return new Post(post.id, post.url, post.description, post.likes, post.comments);
            });

            renderPictures(_posts);
          });
      })
      .catch((event) => showAlert(true, event.message));
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
      mode: 'no-cors',
      body: data,
    })
      .then((response) => {
        if (response.status === 200) {
          throw new PostNotSentException();
        }
      });
  }
}

export default ApiService;
