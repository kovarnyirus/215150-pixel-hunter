import getGameState from './data.js';
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

let state = getGameState();

const questionStats = (time) => (time < 10) ? `fast` :
  (time > 20) ? `slow` : `succes`;

let handlerDispatcher = ({status, time, isGame, name}) => {
  console.log(state.answers);
  if (status === `succes`) {
    if (name) {
      state.userName = name;
    } else if (time) {
      state.questionStats.push(questionStats(time));
      state.time.push(time);
    }
    state.currentLevel++;
    if (isGame) {state.answers.push(true)};
  } else if (status === `goBack`) {
    state = getGameState();
  } else if (status === `fail`) {
    state.answers.push(false);
    state.lives--;
    state.currentLevel++;
    state.questionStats.push(`fail`);
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
    renderScreen( new levelScreens[levelData.type](handlerDispatcher, levelData, state).element);
  }
};

export default dispatcher;
