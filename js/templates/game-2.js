import createElement from '../createElement.js';
import renderScreen from '../utils.js';
import getIntro from './intro.js';
import getGameThree from './game-3.js';
import FOOTER from './footer.js';
import {headerStatistics} from './header.js';
import {INITIAL_STATE} from '../data.js';

const html = ` 
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
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
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>
  </div>
  `;

const template = headerStatistics(INITIAL_STATE) + html + FOOTER;
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
