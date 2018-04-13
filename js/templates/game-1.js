import createElement from '../createElement.js';
import renderScreen from '../utils.js';
import getIntro from './intro.js';
import getGameTwo from './game-2.js';
import FOOTER from './footer.js';
import {headerStatistics} from './header.js';
import {INITIAL_STATE, gamesContent} from '../data.js';


const html = `<div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
      </ul>
    </div>
  </div>
  `;

const template = headerStatistics(INITIAL_STATE) + html + FOOTER;
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
    renderScreen(getGameTwo());
  }
};

const onChangeInputOne = () => {
  chekedOne = true;
  nextScreen();
};

const onChangeInputTwo = () => {
  chekedTwo = true;
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
