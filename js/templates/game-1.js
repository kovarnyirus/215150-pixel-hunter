import createElement from '../createElement.js';
import renderScreen from '../utils.js';
import getIntro from './intro.js';
import getGameTwo from './game-2.js';
import FOOTER from './footer.js';
import {headerStatistics} from './header.js';
import {INITIAL_STATE, gamesContent, gameStatistics} from '../data.js';
import {templateFirst, templateSecomnd, templateThird} from './game-tamplates';



const template = headerStatistics(INITIAL_STATE) + templateFirst(gamesContent.gameOne) + FOOTER;
const gameOne = createElement(template);
let buttonBack = gameOne.querySelector(`.header__back`);
let inputOne = gameOne.querySelectorAll(`input[name="question1"]`);
let inputTwo = gameOne.querySelectorAll(`input[name="question2"]`);
let chekedOne = false;
let chekedTwo = false;


const removeListeners = () => {
  buttonBack.removeEventListener(`mousedown`, onMouseDownButtonBack);
  inputOne[0].removeEventListener(`mousedown`, onChangeInputOne);
  inputOne[1].removeEventListener(`mousedown`, onChangeInputOne);
  inputTwo[0].removeEventListener(`mousedown`, onChangeInputTwo);
  inputTwo[1].removeEventListener(`mousedown`, onChangeInputTwo);
};

const onMouseDownButtonBack = () => {
  removeListeners();
  renderScreen(getIntro());
};

const nextScreen = () => {
  if (chekedOne && chekedTwo) {
    removeListeners();
    gameStatistics.push({answer: chekedOne, time: 20});
    gameStatistics.push({answer: chekedTwo, time: 20});
    console.log(gameStatistics);
    renderScreen(getGameTwo());
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

const getGameOne = () => {
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
