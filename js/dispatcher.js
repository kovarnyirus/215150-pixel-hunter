import getGameState from './data.js';
import renderScreen from './utils.js';
import getGreeting from './templates/greeting.js';
import getIntro from './templates/intro.js';
import getRules from './templates/rules.js';
// import getGameTwo from './templates/game-2.js';
// import getGameOne from './templates/game-1.js';
// import getGameThree from './templates/game-3.js';
// import getStats from './templates/stats.js';

const levelScreens = {
  'intro': getIntro,
  'greeting': getGreeting,
  'rules': getRules,
  // 'game-1': getGameOne,
  // 'game-2': getGameTwo,
  // 'game-3': getGameThree,
  // 'stats': getStats
};

let state = getGameState();

let handlerDispatcher = (status, time, name) => {
  if (status === `succes`) {
    name ? state.userName = name : ``;
    state.currentLevel++;
    state.answers.push(true);
    state.time.push(time);
  } else if (status === `goBack`) {
    state.currentLevel = 0;
  }
  dispatcher();
};

const dispatcher = () => {
  const levelData = state.levels[state.currentLevel];
  if (state.currentLevel === 0) {
    return renderScreen(getIntro(handlerDispatcher));
  } else if (state.currentLevel < 14) {
    renderScreen(levelScreens[levelData.type](handlerDispatcher, levelData));
  }
};

export {dispatcher, state};
