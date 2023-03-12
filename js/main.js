import {generatePost} from './mock-functions.js';
import {createArray} from './utils.js';
import {renderPictures} from './render.js';

const mockPosts = createArray(25, generatePost);

renderPictures(mockPosts);
