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

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

class GameModel {
  constructor() {
    this._getImage = null;
    this._state = null;
    this._gameDataLoad = null;
    this.restart = this.restart.bind(this);
    this.init = this.init.bind(this);
    this.restart();
  }

  get gameData() {
    return {
      currentLevel: this._state.currentLevel,
      answers: this._state.answers,
      lives: this._state.lives,
      levels: this._state.levels,
      userName: this._state.userName,
      questionStats: this._state.questionStats,
      timeOver: this._state.timeOver,
      time: this._state.time
    };
  }

  _getImageByType(imageType) {
    return {
      type: imageType,
      src: this._getImage[imageType]()
    };
  }

  _getRandomImage() {
    const randomImageType = getRandomImageType();
    const randomImage = this._getImageByType(randomImageType);

    return randomImage;
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
    // разобраться  почему теряется контекст this без bind в следующей строке
    const levelGenerators = [this._getGame1Level.bind(this), this._getGame2Level.bind(this), this._getGame3Level.bind(this)];
    const data = [];
    for (let i = 0; i < LENGTH_ARR_GAMES; i++) {
      this._getImage = {
        'paint': elementGetter(images.paintings),
        'photo': elementGetter(images.photos)
      };
      const randomIndex = getRandom(2);
      data.push(levelGenerators[randomIndex]());
    }
    return data;
  }

  _loader() {
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`).
        then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            throw new Error(`файлы не найдены`);
          }
          throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
        }).
        then((data) => {
          this._gameDataLoad = data;
        }).
        catch((err) => {
          throw new Error(`${err}`);
        });
  }

  _getGameData() {
    if (!this._gameDataLoad) {
      this._loader();
    }
    return this._gameDataLoad;
  }

  _questionStats(time) {
    return (time >= 20) ? `fast` : (time <= 10) ? `slow` : `succes`;
  }

  init() {
    let gameList = [this._getIntro(), this._getGreeting(), this._getRules(), ...this._getGameData(), this._getStats()];
    this._state = {
      stats: [],
      lives: INITIAL_LIVES,
      answers: [],
      levels: gameList,
      currentLevel: 0,
      userName: ``,
      questionStats: [],
      time: []
    };

  }

  succesAnswer(time) {
    this._state.answers.push(true);
    this._state.questionStats.push(this._questionStats(time));
    this._state.time.push(time);
  }

  restart() {
    this.init();
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

  timeOut() {
    this._state.time.push(30);
    this._state.questionStats.push(`fail`);
    this._state.currentLevel++;
    this._state.lives--;
  }

  writePlayerName(playerName) {
    this._state.userName = playerName;
  }

  nextScreen() {
    this._state.currentLevel++;
  }

}

export default GameModel;
