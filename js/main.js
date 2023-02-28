const TEST_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const TEST_NAMES = [
  'Кирилл',
  'Евгений',
  'Артем',
  'Артур',
  'Александр',
  'Михаил',
  'Ксения',
  'Алена',
  'Арина',
  'Алина',
  'Петр',
  'Ульяна',
  'Анна',
  'Григорий'
];

const TEST_DESCRIPTIONS = [
  'С волками жить - по волчьи выть.',
  'Настоящая братва - это единицы из сотен, что своих не бросали.',
  'Друзей выбираем мы сами, но лучших оставляет время.',
  'Мне не важно прав он или нет, он мой брат, и я тебя за него разорву!',
  'Своя компания - это компания, в которой можно не думать когда говоришь.',
  'Живи, братуха, и не думай, что кто-то про тебя забыл. Друзья не забывают друга, а кто забыл, тот не был им.'
];

const getRandomInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const generateComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomElement(TEST_COMMENTS),
  name: getRandomElement(TEST_NAMES)
});

const generatePost = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomElement(TEST_DESCRIPTIONS),
  likes: getRandomInt(15, 200),
  comments: Array.from(
    {length: getRandomInt(1, 15)},
    (_, key) => generateComment(parseInt(key.toString() + id.toString(), 10))
  )
});

const mockPosts = Array.from({length: 25}, (_, key) => generatePost(key));

console.log(mockPosts);
