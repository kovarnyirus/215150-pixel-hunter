const IMG_TYPE_LIST = [`photo`, `paint`];
const INITIAL_LIVES = 3;
const LENGTH_ARR_GAMES = 10;
let getImage;
const images = {
  paintings: [
    // People
    `https://k42.kn3.net/CF42609C8.jpg`,

    // Animals
    `https://k42.kn3.net/D2F0370D6.jpg`,

    // Nature
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    // People
    `http://i.imgur.com/1KegWPz.jpg`,

    // Animals
    `https://i.imgur.com/DiHM5Zb.jpg`,

    // Nature
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

let getRandom = (maxValue) => {
  return Math.floor(Math.random() * (maxValue));
};

const elementGetter = (array) => {
  const data = array.slice(0);
  return () => {
    if (data.length === 0) {
      data = array.slice(0);
    }
    let index = getRandom(data.length - 1);
    return data.splice(index, 1).pop();
  };
};

const getRandomImageType = () => {
  return IMG_TYPE_LIST[getRandom(1)];
};

const arrayShuffle = (array) => {
  return array.sort(() => {
    return Math.random() - 0.5;
  });
};

let getImageByType = (typeImage) => {
  return {
    type: typeImage,
    src: getImage[typeImage]()
  };
};



let levelIamges;

let getRandomImage = () => {
  let imageType = getRandomImageType();
  return {
    type: imageType,
    src: getImage[imageType]()
  };
};

const getIntro = () =>({
  type: `intro`
});

const getGreeting = () => ({
  type: `greeting`
});

const getRules = () => ({
  type: `rules`,
  userName: ``
});

const getGame1Level = () =>({
  type: `game-1`,
  title: `Угадайте для каждого изображения фото или рисунок?`,
  images: [getRandomImage(), getRandomImage()]
});

const getGame2Level = () =>({
  type: `game-2`,
  title: `Угадай, фото или рисунок?`,
  images: [getRandomImage(), getRandomImage()]
});

const getGame3Level = () => {
  const getRandomImageTypes = elementGetter(IMG_TYPE_LIST);
  const [wrongType, correctType] = [getRandomImageTypes(), getRandomImageTypes()];
  return{
    type: `game-3`,
    title: `Найдите рисунок среди изображений`,
    correctAnswer: correctType,
    images: arrayShuffle([getImageByType(wrongType), getImageByType(wrongType), getImageByType(correctType)]
  }


};

const getStats = () => ({
  type: `stats`,
});

const levelGenerators = [getGame1Level, getGame2Level, getGame3Level];

const getGameState = () => {

  let gameList = [getIntro(), getGreeting(), getRules()];
  for (let i = 0; i < LENGTH_ARR_GAMES; i++) {
    getImage = {
      'painting': elementGetter(images.paintings),
      'photo': elementGetter(images.photos)
    };
    gameList.push(levelGenerators[getRandom(3)]());
  }
  gameList.push(getStats());

  const state = {
    stats: [],
    lives: INITIAL_LIVES,
    answers: [],
    levels: gameList,
    currentLevel: 0,
    userName: ``,
    questionStats: [],
    time: []
  };
  return state;
};

export default getGameState;
