import {API_URI} from '../utils/const.js';
import Post from '../models/Post.js';
import {renderPictures} from '../helpers/render.js';
import GetPostsException from '../exceptions/GetPostsException.js';

class ApiService {
  /**
   * Fetch posts data from htmlacademy api && render them
   *
   * @throws GetPostsException
   */
  async getPosts() {
    await fetch(`${API_URI}/data`)
      .then((data) => {
        data.json()
          .then((result) => {
            const posts = result.map((el) => {
              if (el.id === undefined) {
                throw new GetPostsException();
              }

              return new Post(el.id, el.url, el.description, el.likes, el.comments);
            });

            renderPictures(posts);
          })
          .catch((e) => alert(e.message));
      })
      .catch((e) => alert(e.message));
  }

  /**
   *
   * @param {FormData} data
   * @returns {Promise<any>}
   */
  async createPost(data) {
    const body = {
      files: data.getAll('filename'),
      scale: data.get('scale'),
      'effect-level': data.get('effect-level'),
      effect: data.get('effect'),
      hashtags: data.get('hashtags'),
      description: data.get('description'),
    };

    console.log(body);

    const response = await fetch(API_URI, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return response.json();
  }
}

export default ApiService;
