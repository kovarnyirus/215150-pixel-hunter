import createElement from '../createElement.js';
import FOOTER from './footer.js';
import {headerStatistics} from './header.js';
import {state} from '../dispatcher.js';
import {templateFirst, templateSecomnd, templateThird} from './game-tamplates';

const IS_GAME = rtue;
const template = headerStatistics(state) + templateFirst(state.levels[0]) + FOOTER;
const gameOne = createElement(template);
let buttonBack = gameOne.querySelector(`.header__back`);
let inputOne = gameOne.querySelectorAll(`input[name="question1"]`);
let inputTwo = gameOne.querySelectorAll(`input[name="question2"]`);
let chekedOne = false;
let chekedTwo = false;
let dispatcherCallback;


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
    handlerDispatcher('succes', 20);
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

const getGameOne = (handlerDispatcher) => {
  dispatcherCallback = handlerDispatcher;
  const node = gameOne.cloneNode(true);
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
