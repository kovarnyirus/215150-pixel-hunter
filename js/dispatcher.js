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
  `intro`: renderScreen(getIntro),
  `greeting`: renderScreen(getGreeting),
  `rules`: renderScreen(getRules),
  `game-1`: renderScreen(getGameOne),
  `game-2`: renderScreen(getGameTwo),
  `game-3`: renderScreen(getGameThree),
  `stats`: renderScreen(getStats)
}

let state = getGameState();
