import createElement from '../createElement.js';
import renderScreen from '../utils.js';
import getIntro from './intro.js';
import getStats from './stats.js';
import FOOTER from './footer.js';
import {headerStatistics} from './header.js';
import {INITIAL_STATE, state} from '../data.js';
import {templateThird} from './game-tamplates';


const template = headerStatistics(INITIAL_STATE) + templateThird(state.levels[2]) + FOOTER;
const gameThree = createElement(template);
let buttonBack;
let gameCard;

const removeListeners = () => {
  gameCard[0].removeEventListener(`change`, onMouseDownGameCard);
  gameCard[1].removeEventListener(`change`, onMouseDownGameCard);
  gameCard[2].removeEventListener(`change`, onMouseDownGameCard);
  buttonBack.removeEventListener(`mousedown`, onMouseDownButtonBack);
};

const onMouseDownButtonBack = () => {
  removeListeners();
  renderScreen(getIntro());
};

const onMouseDownGameCard = () => {
  removeListeners();
  renderScreen(getStats());
};

const getGameThree = () => {
  const node = gameThree.cloneNode(true);
  buttonBack = node.querySelector(`.header__back`);
  gameCard = node.querySelectorAll(`.game__option`);
  buttonBack.addEventListener(`mousedown`, onMouseDownButtonBack);
  gameCard[0].addEventListener(`mousedown`, onMouseDownGameCard);
  gameCard[1].addEventListener(`mousedown`, onMouseDownGameCard);
  gameCard[2].addEventListener(`mousedown`, onMouseDownGameCard);
  return node;
};

export default getGameThree;
