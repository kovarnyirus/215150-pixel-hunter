import createElement from '../createElement.js';
import renderScreen from '../utils.js';
import getIntro from './intro.js';
import getGameOne from './game-1.js';

const html = `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>
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
  <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>`;

const rules = createElement(html);
const buttonGo = rules.querySelector(`.rules__button`);
const buttonBack = rules.querySelector(`.header__back`);
const inputName = rules.querySelector(`.rules__input`);

const onKeyupInputNme = () => {
  if (inputName.value.length) {
    buttonGo.removeAttribute(`disabled`);
  } else {
    buttonGo.setAttribute(`disabled`, `disabled`);
  }
};

const onMouseDownButtonGo = (evt) => {
  evt.preventDefault();
  renderScreen(getGameOne());
  buttonGo.removeEventListener(`mousedown`, onMouseDownButtonGo);
  buttonBack.removeEventListener(`mousedown`, onMouseDownButtonBack);
  inputName.removeEventListener(`keyup`, onKeyupInputNme);
};

const onMouseDownButtonBack = () => {
  renderScreen(getIntro());
  buttonGo.removeEventListener(`mousedown`, onMouseDownButtonGo);
  buttonBack.removeEventListener(`mousedown`, onMouseDownButtonBack);
  inputName.removeEventListener(`keyup`, onKeyupInputNme);
};

const getRules = () => {
  buttonGo.addEventListener(`mousedown`, onMouseDownButtonGo);
  buttonBack.addEventListener(`mousedown`, onMouseDownButtonBack);
  inputName.addEventListener(`keyup`, onKeyupInputNme);
  return rules;
};

export default getRules;
