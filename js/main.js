import {generatePost} from './mockFunctions.js';
import {createArray} from './utils.js';

const mockPosts = createArray(25, generatePost);

console.log(mockPosts);
