import GameModel from './data/game-model.js';
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
const levelScreens = {
  'intro': IntroView,
  'greeting': GreetingView,
  'rules': RulesView,
  'game-1': GameOneView,
  'game-2': GameTwoView,
  'game-3': GameThreeView,
  'stats': StatsView
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
    if (status === `succes`) {
      if (name) {
        this._data.storePlayerName(name);
      } else if (time) {
        this._data.succesAnswer(time);
      }
      this._data.nextScreen();
    } else if (status === `goBack`) {
      this._data.restart();
    } else if (status === `fail`) {
      this._data.wrongAnswer();
    }
    this.run();
  }

  run() {
    let gameData = this._data.gameData;
    const levelData = gameData.levels[gameData.currentLevel];
    if (gameData.currentLevel === 0) {
      renderScreen(new IntroView(this._handlerDispatcher, levelData).element);
    } else if (gameData.lives < 0) {
      renderScreen(new StatsView(this._handlerDispatcher, `fail`, gameData).element);
    } else if (gameData.currentLevel <= 14) {
      const levelScreen = new levelScreens[levelData.type](this._handlerDispatcher, levelData, gameData);
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
          this._data.timeOut();
          this.run();
        }
        time = this._nextTick(time);
        this._renderTimer(element, time);
      }, 1000);
    }

  }

  _nextTick(sec) {
    return timer(sec).tick();
  }

  _renderTimer(element, value) {
    element.textContent = value;
    if (value === REMAINING_SECONDS) {
      element.classList.add(`blink`);
    }
  }

  _stopTimer() {
    clearInterval(this._timer);
  }
}

export default GameDispatcher;
