const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateComment = (id) => {
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

  const commentId = getRandomInt(0, TEST_COMMENTS.length - 1);
  const nameId = getRandomInt(0, TEST_NAMES.length - 1);

  return ({
    id: id,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: TEST_COMMENTS[commentId],
    name: TEST_NAMES[nameId]
  });
};

const generatePost = (id) => {
  const TEST_DESCRIPTIONS = [
    'С волками жить - по волчьи выть.',
    'Настоящая братва - это единицы из сотен, что своих не бросали.',
    'Друзей выбираем мы сами, но лучших оставляет время.',
    'Мне не важно прав он или нет, он мой брат, и я тебя за него разорву!',
    'Своя компания - это компания, в которой можно не думать когда говоришь.',
    'Живи, братуха, и не думай, что кто-то про тебя забыл. Друзья не забывают друга, а кто забыл, тот не был им.'
  ];

  const descriptionId = getRandomInt(0, TEST_DESCRIPTIONS.length - 1);

  return ({
    id: id,
    url: `photos/${id}.jpg`,
    description: TEST_DESCRIPTIONS[descriptionId],
    likes: getRandomInt(15, 200),
    comments: Array.from(
      {
        length: getRandomInt(1, 15),
      },
      (el, key) => generateComment(parseInt(key.toString() + id.toString(), 10))
    ),
  });
};

const mockPosts = Array.from(
  {
    length: 25,
  },
  (el, key) => generatePost(key),
);

console.log(mockPosts);
