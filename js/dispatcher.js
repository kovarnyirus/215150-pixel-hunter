import getGameState from `./data.js`;
import renderScreen from './utils.js';
import getGreeting from './templates/greeting.js';
import getIntro from './templates/intro.js';
import getRules from './templates/rules.js';
import getGameTwo from './templates/game-2.js';
import getGameOne from './templates/game-1.js';
import getGameThree from './templates/game-3.js';
import getStats from './templates/stats.js';

const levelScreens = {
  `intro`: getIntro,
  `greeting`: getGreeting,
  `rules`: getRules,
  `game-1`: getGameOne,
  `game-2`: getGameTwo,
  `game-3`: getGameThree,
  `stats`: getStats
}

let state = getGameState();
