import {renderPictures} from './helpers/render.js';
import Mock from './models/Mock.js';

const posts = Array.from({length: 25}, (_, key) => (new Mock()).getPost(key));

renderPictures(posts);
