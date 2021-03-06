import adaptServerData from './data-adapter.js';
import {onLoadError} from '../utils.js';
import {AnswerDurations} from '../data/game-logic';
import {TimerValues} from '../dispatcher';

const INITIAL_LIVES = 3;
const ScreenTypes = {
  INTRO: `INTRO`,
  GREETING: `GREETING`,
  RULES: `RULES`,
  STATS: `STATS`
};
const AnswerTypes = {
  FAST: `fast`,
  SLOW: `slow`,
  SUCCESS: `succes`,
  FAIL: `fail`
};

class GameModel {
  constructor(handleDataLoad) {
    this._handleDataLoad = handleDataLoad;
    this._dataLoaded = false;
    this._onLoadError = onLoadError;
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
      type: ScreenTypes.INTRO,
      dataLoaded: this._dataLoaded
    };
  }

  static _getGreeting() {
    return {
      type: ScreenTypes.GREETING
    };
  }

  static _getRules() {
    return {
      type: ScreenTypes.RULES,
      userName: ``
    };
  }

  static _getStats() {
    return {
      type: ScreenTypes.STATS
    };
  }

  _onLoad(data) {
    this._dataLoaded = true;
    this._levelsData = data;
    this._state.levels = this._getGameList();
    if (typeof this._handleDataLoad === `function`) {
      return this._handleDataLoad();
    }
    return false;
  }

  _loader() {
    const onLoad = this._onLoad;
    let formatData;
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            return Promise.reject(`Файлы на сервере не найдены`);
          }
          return Promise.reject(`Неизвестный статус: ${response.status} ${response.statusText}`);
        })
        .then((data) => {
          formatData = adaptServerData(data);
          return onLoad(formatData);
        })
        .catch((err) => {
          if (err.stack === `TypeError: Failed to fetch`) {
            return this._onLoadError(`Сервер недоступен`);
          }
          return this._onLoadError(`Ошибка: ${err}`);
        });
  }

  _getGameList() {
    return [this._getIntro(), GameModel._getGreeting(), GameModel._getRules(), ...this._levelsData, GameModel._getStats()];
  }

  static _getQuestionStats(time) {
    if (time >= AnswerDurations.FAST) {
      return AnswerTypes.FAST;
    } else if (time <= AnswerDurations.SLOW) {
      return AnswerTypes.SLOW;
    }
    return AnswerTypes.SUCCESS;
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

  setSuccessAnswer(time) {
    this._state.answers.push(true);
    this._state.questionStats.push(GameModel._getQuestionStats(time));
    this._state.time.push(time);
  }

  restart() {
    this.init();
  }

  setWrongAnswer() {
    this._state.answers.push(false);
    this._state.lives--;
    this._state.currentLevel++;
    this._state.questionStats.push(AnswerTypes.FAIL);
    if (this._state.lives < 0) {
      this._state.currentLevel = this._state.levels.length - 1;
    }
  }

  setTimeOut() {
    this._state.time.push(TimerValues.MAX);
    this._state.questionStats.push(AnswerTypes.FAIL);
    this._state.currentLevel++;
    this._state.lives--;
  }

  savePlayerName(playerName) {
    this._state.userName = playerName;
  }

  setNextScreen() {
    this._state.currentLevel++;
  }
}

export {GameModel, AnswerTypes};
