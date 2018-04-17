import getGameState from './data.js';
import renderScreen from './utils.js';
import getGreeting from './templates/greeting.js';
import getIntro from './templates/intro.js';
import getRules from './templates/rules.js';
import getGameTwo from './templates/game-2.js';
import getGameOne from './templates/game-1.js';
import getGameThree from './templates/game-3.js';
import getStats from './templates/stats.js';

const levelScreens = {
  'intro': getIntro,
  'greeting': getGreeting,
  'rules': getRules,
  'game-1': getGameOne,
  'game-2': getGameTwo,
  'game-3': getGameThree,
  'stats': getStats
};

let state = getGameState();

let handlerDispatcher = (status, time, isGame, name) => {
  if (status === `succes`) {
    if (name) {
      state.userName = name;
    } else if (time) {
      if (time < 10) {
        state.questionStats.push(`fast`);
      } else if (time > 20) {
        state.questionStats.push(`slow`);
      } else {
        state.questionStats.push(`succes`);
      }
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
  console.log(state.time);
  const levelData = state.levels[state.currentLevel];
  if (state.currentLevel === 0) {
    return renderScreen(getIntro(handlerDispatcher));
  } else if (state.lives === 0) {
    renderScreen(getStats(handlerDispatcher, `fail`, state));
  } else if (state.currentLevel < 14) {
    renderScreen(levelScreens[levelData.type](handlerDispatcher, levelData, state));
  }
};

export default dispatcher;
