import GameModel from './data.js';
import renderScreen from './utils.js';
import greetingView from './templates/greetingView';
import IntroView from './templates/IntroView.js';
import rulesView from './templates/rulesView.js';
import gameTwoView from './templates/gameTwoView.js';
import gameOneView from './templates/gameOneView.js';
import gameThreeView from './templates/gameThreeView.js';
import statsView from './templates/statsView.js';

const levelScreens = {
  'intro': IntroView,
  'greeting': greetingView,
  'rules': rulesView,
  'game-1': gameOneView,
  'game-2': gameTwoView,
  'game-3': gameThreeView,
  'stats': statsView
};

class GameDispatcher {
  constructor() {
    this.dispatcher = this.dispatcher.bind(this);
    this.handlerDispatcher = this.handlerDispatcher.bind(this);
    this._data = this._gameModel();
    this.dispatcher();
  }

  _gameModel() {
    return new GameModel();
  }

  handlerDispatcher({status, time, isGame, name}) {
    if (status === `succes`) {
      if (name) {
        this._data.writePlayerName(name);
      } else if (time) {
        this._data.succesAnswer(time);
      }
      this._data.nextScreen();
    } else if (status === `goBack`) {
      this._data.restart();
    } else if (status === `fail`) {
      this._data.wrongAnswer();
    }
    this.dispatcher();
  };


  dispatcher() {
    let gameData = this._data.gameData;
    const levelData = gameData.levels[gameData.currentLevel];
    if (gameData.currentLevel === 0) {
      return renderScreen(new IntroView(this.handlerDispatcher).element);
    } else if (gameData.lives === 0) {
      renderScreen(new statsView(this.handlerDispatcher, `fail`, this._state).element);
    } else if (gameData.currentLevel < 14) {
      renderScreen(new levelScreens[levelData.type](this.handlerDispatcher, levelData, gameData).element);
    }
  };

}

export default GameDispatcher;
