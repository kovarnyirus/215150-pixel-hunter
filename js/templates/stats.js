import createElement from '../createElement.js';
import FOOTER from './footer.js';
import {header} from './header.js';
import {timeOutTemplate, failTemplate, winTemplate} from './stats-templates.js';

const IS_GAME = false;
let gameData;
let templateContent;
let html;

let dispatcherCallback;
let handleMousedownButtonBack;

const onMouseDownButtonBack = (buttonBack) => () => {
  buttonBack.removeEventListener(`mousedown`, handleMousedownButtonBack);
  dispatcherCallback({status: `goBack`, isGame: IS_GAME});
};

const getStats = (dispatch, status, stats) => {
  if (status === `fail`) {
    html = header + failTemplate(stats) + FOOTER;
  } else {
    html = header + winTemplate(stats) + FOOTER;
  }
  gameData = stats;
  const statsData = stats.questionStats;
  dispatcherCallback = dispatch;

  const statsTemplate = createElement(html);
  const node = statsTemplate.cloneNode(true);
  const buttonBack = node.querySelector(`.header__back`);
  handleMousedownButtonBack = onMouseDownButtonBack(buttonBack);
  buttonBack.addEventListener(`mousedown`, handleMousedownButtonBack);
  return node;
};

export default getStats;
