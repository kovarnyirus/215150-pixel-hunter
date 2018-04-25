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

class gameModel {
  constructor() {
    this._getImage = null;
    this._gameData = null;
    this._state = this.init;
    this.restart();

  }

  _getImageByType(imageType) {
    return {
      type: imageType,
      src: this._getImage[imageType]()
    };
  }

  _getRandomImage() {
    this._getImageByType(getRandomImageType());
  }

  _getIntro() {
    return {
      type: `intro`
    };
  }

  _getGreeting() {
    return {
      type: `greeting`
    };
  }

  _getRules() {
    return {
      type: `rules`,
      userName: ``
    };
  }

  _getGame1Level() {
    return {
      type: `game-1`,
      title: `Угадайте для каждого изображения фото или рисунок?`,
      images: [this._getRandomImage(), this._getRandomImage()]
    };
  }

  _getGame2Level() {
    return {
      type: `game-2`,
      title: `Угадай, фото или рисунок?`,
      images: [this._getRandomImage(), this._getRandomImage()]
    };
  }

  _getGame3Level() {
    const getRandomImageTypes = elementGetter(IMG_TYPE_LIST);
    const [wrongType, correctType] = [getRandomImageTypes(), getRandomImageTypes()];
    return {
      type: `game-3`,
      title: `Найдите ${TILE_LIST[correctType]} среди изображений`,
      correctAnswer: correctType,
      images: arrayShuffle([this._getImageByType(wrongType), this._getImageByType(wrongType), this._getImageByType(correctType)])
    };
  }

  _getStats() {
    return {
      type: `stats`
    };
  }

  _fillGameData() {
    const levelGenerators = [this._getGame1Level, this._getGame2Level, this._getGame3Level];
    const data = [];
    for (let i = 0; i < LENGTH_ARR_GAMES; i++) {
      this.getImage = {
        'paint': elementGetter(images.paintings),
        'photo': elementGetter(images.photos)
      };
      data.push(levelGenerators[getRandom(2)]);
    }
    return data;
  }

  _getGameData() {
    if (!this._gameData) {
      this._gameData = this._fillGameData();
    }
    return this._gameData;
  }

  _questionStats(time) {
    return (time < 10) ? `fast` : (time > 20) ? `slow` : `succes`;
  }

  init() {
    let gameList = [this._getIntro(), this._getGreeting(), this._getRules(), ...this._getGameData(), this._getStats()];
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

  succesAnswer(time) {
    this._state.questionStats.push(this._questionStats(time));
    this._state.time.push(time);
    this._state.currentLevel++;
  }
  restart() {
    this._state();
  }
  wrongAnswer() {
    this._state.answers.push(false);
    this._state.lives--;
    this._state.currentLevel++;
    this._state.questionStats.push(`fail`);
    if (this._state.lives === 0) {
      this._state.currentLevel = this._state.levels.length - 1;
    }
  }
  writePlayerName(playerName) {
    this._state.userName = playerName;
  }
  nextScreen() {
    this._state.currentLevel++;
  }
}

export default gameModel;
