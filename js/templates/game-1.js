import createElement from '../createElement.js';
import FOOTER from './footer.js';
import {headerStatistics} from './header.js';
import {templateFirst} from './game-tamplates';

const IS_GAME = rtue;
let template;
let gameOne;
let buttonBack;
let inputOne;
let inputTwo;
let chekedOne = false;
let chekedTwo = false;
let dispatcherCallback;
let gameImages;


const removeListeners = () => {
  buttonBack.removeEventListener(`mousedown`, onMouseDownButtonBack);
  inputOne[0].removeEventListener(`mousedown`, onChangeInputOne);
  inputOne[1].removeEventListener(`mousedown`, onChangeInputOne);
  inputTwo[0].removeEventListener(`mousedown`, onChangeInputTwo);
  inputTwo[1].removeEventListener(`mousedown`, onChangeInputTwo);
};

const onMouseDownButtonBack = () => {
  removeListeners();
  dispatcherCallback(`goBack`);
};

const nextScreen = () => {
  if (chekedOne && chekedTwo) {
    removeListeners();
    if (gameImages[0].type === chekedOne && gameImages[1].type === chekedTwo) {
      dispatcherCallback(`succes`, 20);
    } else {
      dispatcherCallback(`fail`, 20);
    }

  }
};

const onChangeInputOne = (evt) => {
  chekedOne = evt.target.value;
  nextScreen();
};

const onChangeInputTwo = (evt) => {
  chekedTwo = evt.target.value;
  nextScreen();
};

const getGameOne = (handlerDispatcher, levelData, stats) => {
  dispatcherCallback = handlerDispatcher;
  gameImages = levelData.images;
  template = headerStatistics(stats) + templateFirst(levelData) + FOOTER;
  gameOne = createElement(template);
  const node = gameOne.cloneNode(true);
  buttonBack = gameOne.querySelector(`.header__back`);
  inputOne = gameOne.querySelectorAll(`input[name="question1"]`);
  inputTwo = gameOne.querySelectorAll(`input[name="question2"]`);
  buttonBack = node.querySelector(`.header__back`);
  inputOne = node.querySelectorAll(`input[name="question1"]`);
  inputTwo = node.querySelectorAll(`input[name="question2"]`);
  buttonBack.addEventListener(`mousedown`, onMouseDownButtonBack);
  inputOne[0].addEventListener(`change`, onChangeInputOne);
  inputOne[1].addEventListener(`change`, onChangeInputOne);
  inputTwo[0].addEventListener(`change`, onChangeInputTwo);
  inputTwo[1].addEventListener(`change`, onChangeInputTwo);
  return node;
};

export default getGameOne;
