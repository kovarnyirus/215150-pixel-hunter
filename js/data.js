const IMG_TYPE_LIST = [`photo`, `paint`];
const TILE_LIST = {photo: `фото`, paint: `рисунок`};
const INITIAL_LIVES = 3;
const LENGTH_ARR_GAMES = 10;

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

let getRandom = (maxValue) => Math.floor(Math.random() * (maxValue + 1));

const elementGetter = (array) => {
  const data = array.slice(0);
  return () => {
    if (data.length === 0) {
      data = array.slice(0);
    }
    return data.splice(getRandom(data.length - 1), 1).pop();
  };
};

const getRandomImageType = () => IMG_TYPE_LIST[getRandom(1)];

const arrayShuffle = (array) => array.sort(() => Math.random() - 0.5);

// let getImageByType = (imageType) => ({
//   type: imageType,
//   src: getImage[imageType]()
// });
//
// let getRandomImage = () => getImageByType(getRandomImageType());
//
// const getIntro = () => ({
//   type: `intro`
// });
//
// const getGreeting = () => ({
//   type: `greeting`
// });
//
// const getRules = () => ({
//   type: `rules`,
//   userName: ``
// });
//
// const getGame1Level = () => ({
//   type: `game-1`,
//   title: `Угадайте для каждого изображения фото или рисунок?`,
//   images: [getRandomImage(), getRandomImage()]
// });
//
// const getGame2Level = () => ({
//   type: `game-2`,
//   title: `Угадай, фото или рисунок?`,
//   images: [getRandomImage(), getRandomImage()]
// });
//
// const getGame3Level = () => {
//   const getRandomImageTypes = elementGetter(IMG_TYPE_LIST);
//   const [wrongType, correctType] = [getRandomImageTypes(), getRandomImageTypes()];
//
//   return {
//     type: `game-3`,
//     title: `Найдите ${TILE_LIST[correctType]} среди изображений`,
//     correctAnswer: correctType,
//     images: arrayShuffle([getImageByType(wrongType), getImageByType(wrongType), getImageByType(correctType)])
//   };
// };
//
// const getStats = () => ({
//   type: `stats`,
// });
//
// const levelGenerators = [getGame1Level, getGame2Level, getGame3Level];
//
// const fillGameData = () => {
//   const data = [];
//   for (let i = 0; i < LENGTH_ARR_GAMES; i++) {
//     getImage = {
//       'paint': elementGetter(images.paintings),
//       'photo': elementGetter(images.photos)
//     };
//     data.push(levelGenerators[getRandom(2)]());
//   }
//   return data;
// };
//
// let gameData;
//
// const getGameData = () => {
//   if (!gameData) {
//     gameData = fillGameData();
//   }
//   return gameData;
// };
//
//
// const getGameState = () => {
//   let gameList = [getIntro(), getGreeting(), getRules(), ...getGameData(), getStats()];
//   const state = {
//     stats: [],
//     lives: INITIAL_LIVES,
//     answers: [],
//     levels: gameList,
//     currentLevel: 0,
//     userName: ``,
//     questionStats: [],
//     time: []
//   };
//   return state;
// };


class gameModel {
  constructor() {
    this.init = this.getGameState();
  }

  let getImage;

  let gameData;

  getImageByType(imageType) {
    return {
      type: imageType,
      src: this.getImage[imageType]()
    };
  }

  getRandomImage() {
    this.getImageByType(getRandomImageType());
  }

  getIntro() {
    return {
      type: `intro`
    };
  }

  getGreeting() {
    return {
      type: `greeting`
    };
  }

  getRules() {
    return {
      type: `rules`,
      userName: ``
    };
  }

  getGame1Level() {
    return {
      type: `game-1`,
      title: `Угадайте для каждого изображения фото или рисунок?`,
      images: [this.getRandomImage(), this.getRandomImage()]
    };
  }

  getGame2Level() {
    return {
      type: `game-2`,
      title: `Угадай, фото или рисунок?`,
      images: [this.getRandomImage(), this.getRandomImage()]
    };
  }

  getGame3Level() {
    const getRandomImageTypes = elementGetter(IMG_TYPE_LIST);
    const [wrongType, correctType] = [getRandomImageTypes(), getRandomImageTypes()];
    return {
      type: `game-3`,
      title: `Найдите ${TILE_LIST[correctType]} среди изображений`,
      correctAnswer: correctType,
      images: arrayShuffle([this.getImageByType(wrongType), this.getImageByType(wrongType), this.getImageByType(correctType)])
    };
  }

  getStats() {
    return {
      type: `stats`
    };
  }

  levelGenerators() {
    [this.getGame1Level, this.getGame2Level, this.getGame3Level];
  }

  fillGameData() {
    const data = [];
    for (let i = 0; i < LENGTH_ARR_GAMES; i++) {
      this.getImage = {
        'paint': elementGetter(images.paintings),
        'photo': elementGetter(images.photos)
      };
      data.push(this.levelGenerators[getRandom(2)]());
    }
    return data;
  }

  getGameData() {
    if (!this.gameData) {
      this.gameData = this.fillGameData();
    }
    return this.gameData;
  }

  getGameState() {
    let gameList = [this.getIntro(), this.getGreeting(), this.getRules(), ...this.getGameData(), this.getStats()];
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
  }
}

export default gameModel;
