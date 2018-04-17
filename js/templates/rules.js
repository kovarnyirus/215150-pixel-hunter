import createElement from '../createElement.js';
import FOOTER from './footer.js';
import {header} from './header.js';

const IS_GAME = false;
const html = `${header}
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
${FOOTER}`;


const rules = createElement(html);
let buttonGo;
let buttonBack;
let inputName;
let dispatcherCallback;

const onKeyupInputName = () => {
  if (inputName.value.length) {
    buttonGo.removeAttribute(`disabled`);
  } else {
    buttonGo.setAttribute(`disabled`, `disabled`);
  }
};

const removeListeners = () => {
  buttonGo.removeEventListener(`mousedown`, onMouseDownButtonGo);
  buttonBack.removeEventListener(`mousedown`, onMouseDownButtonBack);
  inputName.removeEventListener(`keyup`, onKeyupInputName);
};

const onMouseDownButtonGo = (evt) => {
  evt.preventDefault();
  removeListeners();
  dispatcherCallback(`succes`, ``, IS_GAME, inputName.value);
};

const onMouseDownButtonBack = () => {
  removeListeners();
  dispatcherCallback(`goBack`);
};

const getRules = (dispatch) => {
  dispatcherCallback = dispatch;
  const node = rules.cloneNode(true);
  buttonGo = node.querySelector(`.rules__button`);
  buttonBack = node.querySelector(`.header__back`);
  inputName = node.querySelector(`.rules__input`);

  buttonGo.addEventListener(`mousedown`, onMouseDownButtonGo);
  buttonBack.addEventListener(`mousedown`, onMouseDownButtonBack);
  inputName.addEventListener(`keyup`, onKeyupInputName);
  return node;
};

export default getRules;
