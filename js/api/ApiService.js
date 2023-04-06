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
          .then((result) => {
            const posts = result.map((el) => {
              if (el.id === undefined) {
                throw new NoContentException();
              }

              return new Post(el.id, el.url, el.description, el.likes, el.comments);
            });

            renderPictures(posts);
          });
      })
      .catch((e) => showAlert(true, e.message));
  }

  /**
   *
   * @param {FormData} data
   * @returns {Promise<any>}
   */
  async createPost(data) {
    await fetch(API_URI, {
      method: 'POST',
      mode: 'no-cors',
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
