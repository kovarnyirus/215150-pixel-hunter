import createElement from '../createElement.js';
import FOOTER from './footer.js';
import {headerStatistics} from './header.js';
import {templateThird} from './game-tamplates';

const IS_GAME = rtue;
let template;
let gameThree;
let buttonBack;
let gameCard;
let dispatcherCallback;

const removeListeners = () => {
  gameCard[0].removeEventListener(`change`, onMouseDownGameCard);
  gameCard[1].removeEventListener(`change`, onMouseDownGameCard);
  gameCard[2].removeEventListener(`change`, onMouseDownGameCard);
  buttonBack.removeEventListener(`mousedown`, onMouseDownButtonBack);
};

const onMouseDownButtonBack = () => {
  removeListeners();
  dispatcherCallback(`goBack`);
};

const onMouseDownGameCard = () => {
  removeListeners();
  dispatcherCallback(`succes`, 20);
};

const getGameThree = (handlerDispatcher, level, stats) => {
  dispatcherCallback = handlerDispatcher;
  template = headerStatistics(stats) + templateThird(level) + FOOTER;
  gameThree = createElement(template);
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
