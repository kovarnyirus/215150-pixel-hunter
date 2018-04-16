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
    dispatcherCallback(`succes`, 20);
  } else {
    dispatcherCallback(`fail`, 20);
  }

};

const getGameTwo = (handlerDispatcher, levelData, stats) => {
  gameImages = levelData.images;
  dispatcherCallback = handlerDispatcher;
  template = headerStatistics(stats) + templateSecomnd(levelData) + FOOTER;
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
