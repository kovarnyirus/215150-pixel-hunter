const lelengthArrGames = 10;
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
  const minValue = 0;
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
};

const elementGetter = (array) =>{
  const data = array.slice(0);
  return () => {
    if (data.length === 0) {
      data = array.slice(0);
    }
    let index = getRandom(data.length - 1);
    return data.splice(index, 1).pop();
  };
};

const getRandomImageType = () =>{
  const imgTypeList = [`photo`, `painting`];
  return imgTypeList[getRandom(1)];
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

const levelGenerators = [getGame1Level, getGame2Level, getGame3Level];

const INITIAL_STATE = {
  lives: 3,
  time: 0
};

const getGameState = () => {
  let gameList = [];
  for (let i = 0; i < lelengthArrGames; i++) {
    getImage = {
      'painting': elementGetter(images.paintings),
      'photo': elementGetter(images.photos)
    };
    gameList.push(levelGenerators[getRandom(2)]());
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

getGameState();
console.log(state);

export {INITIAL_STATE, state, getGameState};
