import createElement from '../createElement.js';
import renderScreen from '../utils.js';
import getIntro from './intro.js';
import getStats from './stats.js';
import FOOTER from './footer.js';
import {headerStatistics} from './header.js';
import {INITIAL_STATE, statsList} from '../data.js';
import {stats} from './stats-template.js';

const html = `
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
    </form>
    ${stats(statsList)}
  </div>
  `;




const template = headerStatistics(INITIAL_STATE) + html + FOOTER;
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
