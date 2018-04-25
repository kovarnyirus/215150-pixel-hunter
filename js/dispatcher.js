import gameModel from './data.js';
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

let state = new gameModel().init();


let handlerDispatcher = ({status, time, isGame, name}) => {
  if (status === `succes`) {
    if (name) {
      // state.userName = name;
      gameModel.writePlayerName(name);
    } else if (time) {
      gameModel.succesAnswer(time)
      // state.questionStats.push(questionStats(time));
      // state.time.push(time);
    }
    // state.currentLevel++
    gameModel.nextScreen();
    // if (isGame) {
    //   state.answers.push(true);
    // }
  } else if (status === `goBack`) {
    // state = getGameState();
    gameModel.restart();
  } else if (status === `fail`) {
    gameModel.wrongAnswer;
    // state.answers.push(false);
    // state.lives--;
    // state.currentLevel++;
    // state.questionStats.push(`fail`);
  }
  dispatcher();
};

const dispatcher = () => {
  const levelData = state.levels[state.currentLevel];
  if (state.currentLevel === 0) {
    return renderScreen(new IntroView(handlerDispatcher).element);
  } else if (state.lives === 0) {
    renderScreen(new statsView(handlerDispatcher, `fail`, state).element);
  } else if (state.currentLevel < 14) {
    renderScreen(new levelScreens[levelData.type](handlerDispatcher, levelData, state).element);
  }
};

export default dispatcher;
