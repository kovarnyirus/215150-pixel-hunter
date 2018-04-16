import createElement from '../createElement.js';
import FOOTER from './footer.js';
import {headerStatistics} from './header.js';
import {templateSecomnd} from './game-tamplates';

const IS_GAME = rtue;
let template;
let gameTwo;
let buttonBack;
let inputQuestion;
let dispatcherCallback;
let gameImages;
const timeAnswer = 20;

const removeListeners = () => {
  buttonBack.removeEventListener(`mousedown`, onMouseDownButtonBack);
  inputQuestion[0].removeEventListener(`change`, onChangeInput);
  inputQuestion[1].removeEventListener(`change`, onChangeInput);
};

const onMouseDownButtonBack = () => {
  removeListeners();
  dispatcherCallback(`goBack`);
};

const onChangeInput = (evt) => {
  removeListeners();
  if (gameImages[0].type === evt.target.value) {
    dispatcherCallback(`succes`, timeAnswer);
  } else {
    dispatcherCallback(`fail`, timeAnswer);
  }

};

const getGameTwo = (dispatch, levelData, stats) => {
  const statsData = stats.questionStats;
  gameImages = levelData.images;
  dispatcherCallback = dispatch;
  template = headerStatistics(stats) + templateSecomnd(levelData, statsData) + FOOTER;
  gameTwo = createElement(template);
  const node = gameTwo.cloneNode(true);
  buttonBack = node.querySelector(`.header__back`);
  inputQuestion = node.querySelectorAll(`input`);
  buttonBack.addEventListener(`mousedown`, onMouseDownButtonBack);
  inputQuestion[0].addEventListener(`change`, onChangeInput);
  inputQuestion[1].addEventListener(`change`, onChangeInput);
  return node;
};

export default getGameTwo;
