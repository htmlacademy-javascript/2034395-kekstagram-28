import {renderPictures} from './helpers/render.js';
import Post from './models/Post.js';

const posts = Array.from({length: 25}, (_, key) => Post.mock(key));

renderPictures(posts);
