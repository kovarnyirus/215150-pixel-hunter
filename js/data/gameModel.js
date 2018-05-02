import adaptServerData from './data-adapter.js';

const INITIAL_LIVES = 3;

class GameModel {
  constructor(handleDataLoad) {
    this._handleDataLoad = handleDataLoad;
    this._dataLoaded = false;
    this._getImage = null;
    this._state = null;
    this.restart = this.restart.bind(this);
    this._loader = this._loader.bind(this);
    this._onLoad = this._onLoad.bind(this);
    this._levelsData = [];
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


  _getIntro() {
    return {
      type: `intro`,
      dataLoaded: this._dataLoaded
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

  _getStats() {
    return {
      type: `stats`
    };
  }

  _onLoad(data) {
    this._dataLoaded = true;
    this._levelsData = data;
    this._state.levels = this._getGameList();
    if (typeof this._handleDataLoad === `function`) {
      return this._handleDataLoad();
    }
  }

  _loader() {
    const onLoad = this._onLoad;
    let formatData;
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            throw new Error(`файлы не найдены`);
          }
          throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
        })
        .then((data) => {
          formatData = adaptServerData(data);
          onLoad(formatData);
        })
        .catch((err) => {
          throw new Error(`${err}`);
        });
  }

  _getGameList() {
    return [this._getIntro(), this._getGreeting(), this._getRules(), ...this._levelsData, this._getStats()];
  }

  _questionStats(time) {
    return (time >= 20) ? `fast` : (time <= 10) ? `slow` : `succes`;
  }


  init() {
    this._state = {
      stats: [],
      lives: INITIAL_LIVES,
      answers: [],
      levels: this._getGameList(),
      currentLevel: 0,
      userName: ``,
      questionStats: [],
      time: []
    };
    if (!this._dataLoaded) {
      this._loader();
    }
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
    if (this._state.lives < 0) {
      this._state.currentLevel = this._state.levels.length - 1;
    }
  }

  timeOut() {
    this._state.time.push(30);
    this._state.questionStats.push(`fail`);
    this._state.currentLevel++;
    this._state.lives--;
  }

  storePlayerName(playerName) {
    this._state.userName = playerName;
  }

  nextScreen() {
    this._state.currentLevel++;
  }
}

export default GameModel;
