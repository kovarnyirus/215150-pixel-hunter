import createElement from '../createElement.js';
import renderScreen from '../utils.js';
import getIntro from './intro.js';
import getGameThree from './game-3.js';
import FOOTER from './footer.js';
import {headerStatistics} from './header.js';
import {INITIAL_STATE, state} from '../data.js';
import {templateFirst, templateSecomnd, templateThird} from './game-tamplates';


const template = headerStatistics(INITIAL_STATE) + templateSecomnd(state.gameTwo) + FOOTER;
const gameTwo = createElement(template);
let buttonBack;
let inputQuestion;

const removeListeners = () => {
  buttonBack.removeEventListener(`mousedown`, onMouseDownButtonBack);
  inputQuestion[0].removeEventListener(`change`, onChangeInput);
  inputQuestion[1].removeEventListener(`change`, onChangeInput);
};

const onMouseDownButtonBack = () => {
  removeListeners();
  renderScreen(getIntro());
};

const onChangeInput = () => {
  removeListeners();
  renderScreen(getGameThree());
};

const getGameTwo = () => {
  const node = gameTwo.cloneNode(true);
  buttonBack = node.querySelector(`.header__back`);
  inputQuestion = node.querySelectorAll(`input`);
  buttonBack.addEventListener(`mousedown`, onMouseDownButtonBack);
  inputQuestion[0].addEventListener(`change`, onChangeInput);
  inputQuestion[1].addEventListener(`change`, onChangeInput);
  return node;
};

export default getGameTwo;
