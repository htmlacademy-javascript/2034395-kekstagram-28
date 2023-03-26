class Post {
  /**
   * @param {int} id
   * @param {?string} url
   * @param {?string} description
   * @param {?int} likes
   * @param {Comment[]} comments
   */
  constructor(id, url, description, likes, comments) {
    this._id = id;
    this._url = url;
    this._description = description;
    this._likes = likes;
    this._comments = comments;
  }

  get id() {
    return this._id;
  }

  get url() {
    return this._url;
  }

  get description() {
    return this._description;
  }

  get likes() {
    return this._likes;
  }

  get comments() {
    return this._comments;
  }

  /**
   * Prepare picture to append in Document Fragment
   *
   * @return {Node} Result Node
   */
  preparePicture() {
    const template = document.querySelector('#picture');

    const picture = template.content.cloneNode(true);

    picture.querySelector('.picture').id = this.id.toString();
    picture.querySelector('.picture__img').src = this.url;
    picture.querySelector('.picture__comments').textContent = this.comments.length.toString();
    picture.querySelector('.picture__likes').textContent = this.likes.toString();

    return picture;
  }
}

export default Post;
