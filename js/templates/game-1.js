import createElement from '../createElement.js';
import FOOTER from './footer.js';
import {headerStatistics} from './header.js';
import {templateFirst} from './game-tamplates';

const IS_GAME = true;
let template;
let gameOne;
let buttonBack;
let inputOne;
let inputTwo;
let chekedOne = false;
let chekedTwo = false;
let dispatcherCallback;
let gameImages;
const timeAnswer = 20;


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
      dispatcherCallback(`succes`, timeAnswer, IS_GAME);
    } else {
      dispatcherCallback(`fail`, timeAnswer);
    }
    chekedOne = false;
    chekedTwo = false;
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

const getGameOne = (dispatch, levelData, stats) => {
  dispatcherCallback = dispatch;
  gameImages = levelData.images;
  const statsData = stats.questionStats;
  template = headerStatistics(stats) + templateFirst(levelData, statsData) + FOOTER;
  gameOne = createElement(template);
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
