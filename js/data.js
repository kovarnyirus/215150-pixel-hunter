const lelengthArrPicture = 2;
const lelengthArrPhoto = 2;

const images = {
  pictures: [
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
  const minValue = 0;
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
};

const getRandomPainting = () =>{
  return images.pictures[getRandom(lelengthArrPicture)];
};


const getRandomPhoto = () => {
  return images.photos[getRandom(lelengthArrPhoto)];
};

const getRandomImageType = () =>{
  const imgTypeList = [`photo`, `painting`];
  return imgTypeList[getRandom(1)];
};

let getImage = {
  'photo': getRandomPhoto(),
  'painting': getRandomPainting()
};

let getRandomImage = () => {
  let imageType = getRandomImageType();
  return {
    type: imageType,
    src: getImage[imageType]
  };
};

const getGame1Level = () =>{
  return {
    type: `game-1`,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    images: [getRandomImage(), getRandomImage()]
  };
};

const getGame2Level = () =>{
  return {
    type: `game-2`,
    title: `Угадай, фото или рисунок?`,
    images: [getRandomImage(), getRandomImage()]
  };
};

const getGame3Level = () =>{
  return {
    type: `game-3`,
    title: `Найдите рисунок среди изображений`,
    images: [getRandomImage(), getRandomImage(), getRandomImage()]
  };
};

const arrGames = [getGame1Level(), getGame2Level(), getGame3Level()];

const INITIAL_STATE = {
  lives: 3,
  time: 0
};

const getRandomGame = () => {
  let gameList = [];
  for (let i = 0; i <= 10; i++) {
    arr.push(arrGames[getRandom(2)]);
  }
  return gameList;
};

const state = {
  stats: [], // будет зполняться по мере игры
  lives: 3, // будет зполняться по мере игры
  answers: [], // будет зполняться по мере игры
  levels: getRandomGame(),
  currentLevel: 0,
  time: []
};


console.log(state);
getRandomGame();

export {INITIAL_STATE, state};
