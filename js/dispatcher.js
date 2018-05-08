import {GameModel} from './data/game-model.js';
import timer from './data/timer.js';
import {renderScreen} from './utils.js';
import GreetingView from './templates/greeting-view';
import IntroView from './templates/intro-view.js';
import RulesView from './templates/rules-view.js';
import GameTwoView from './templates/game-two-view.js';
import GameOneView from './templates/game-one-view.js';
import GameThreeView from './templates/game-three-view.js';
import StatsView from './templates/stats-view.js';

const REMAINING_SECONDS = 5;
const MAX_TIMER = 30;
const LEVELSCREENS = {
  'INTRO': IntroView,
  'GREETING': GreetingView,
  'RULES': RulesView,
  'GAME-1': GameOneView,
  'GAME-2': GameTwoView,
  'GAME-3': GameThreeView,
  'STATS': StatsView
};

const GameStatuses = {
  SUCCES: `succes`,
  FAIL: `fail`,
  GO_BACK: `goBack`
};

class GameDispatcher {
  constructor() {
    this.run = this.run.bind(this);
    this._timer = null;
    this._handlerDispatcher = this._handlerDispatcher.bind(this);
    this._handleDataLoad = this._handleDataLoad.bind(this);
    this._data = new GameModel(this._handleDataLoad);
  }
  _handleDataLoad() {
    this.run();
  }

  _handlerDispatcher({status, time, isGame, name}) {
    if (isGame) {
      this._stopTimer();
    }
    if (status === GameStatuses.SUCCES) {
      if (name) {
        this._data.savePlayerName(name);
      } else if (time) {
        this._data.setSuccesAnswer(time);
      }
      this._data.setNextScreen();
    } else if (status === GameStatuses.GO_BACK) {
      this._data.restart();
    } else if (status === GameStatuses.FAIL) {
      this._data.setWrongAnswer();
    }
    this.run();
  }

  run() {
    const gameData = this._data.gameData;
    const levelData = gameData.levels[gameData.currentLevel];
    if (gameData.currentLevel === 0) {
      renderScreen(new IntroView(this._handlerDispatcher, levelData).element);
    } else if (gameData.lives < 0) {
      renderScreen(new StatsView(this._handlerDispatcher, GameStatuses.FAIL, gameData).element);
    } else if (gameData.currentLevel <= 14) {
      const levelScreen = new LEVELSCREENS[levelData.type](this._handlerDispatcher, levelData, gameData);
      const element = levelScreen.timer;
      renderScreen(levelScreen.element);
      this._initTimer(element, MAX_TIMER);
    }
  }

  _initTimer(element, sec) {
    let time = sec;
    if (element !== null) {
      element.textContent = sec;
      this._timer = setInterval(() => {
        if (time === 1) {
          this._stopTimer();
          this._data.setTimeOut();
          this.run();
        }
        time = GameDispatcher._getNextTick(time);
        GameDispatcher._renderTimer(element, time);
      }, 1000);
    }

  }

  static _getNextTick(sec) {
    return timer(sec).tick();
  }

  static _renderTimer(element, value) {
    element.textContent = value;
    if (value === REMAINING_SECONDS) {
      element.classList.add(`blink`);
    }
  }

  _stopTimer() {
    clearInterval(this._timer);
  }
}

export {GameDispatcher, GameStatuses};
