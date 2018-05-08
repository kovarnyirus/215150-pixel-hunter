import AbstractView from '../abstract-view.js';
import {HEADER} from './header.js';
import {GameStatuses} from '../dispatcher.js';

class RulesView extends AbstractView {
  constructor(dispatch) {
    super(dispatch);
    this.onMouseDownButtonGo = this.onMouseDownButtonGo.bind(this);
    this.onMouseDownButtonBack = this.onMouseDownButtonBack.bind(this);
    this.onKeyUpInputName = this.onKeyUpInputName.bind(this);
    this.header = HEADER;
  }

  get template() {
    return `${this.header}
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
      <input class="rules__input" autofocus type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
      ${this._footer}`;
  }

  bind() {
    this.buttonGo = this.element.querySelector(`.rules__button`);
    this.buttonBack = this.element.querySelector(`.header__back`);
    this.inputName = this.element.querySelector(`.rules__input`);

    this.buttonGo.addEventListener(`mousedown`, this.onMouseDownButtonGo);
    this.buttonBack.addEventListener(`mousedown`, this.onMouseDownButtonBack);
    this.inputName.addEventListener(`keyup`, this.onKeyUpInputName);
  }

  onKeyUpInputName() {
    if (this.inputName.value.length) {
      this.buttonGo.removeAttribute(`disabled`);
    } else {
      this.buttonGo.setAttribute(`disabled`, `disabled`);
    }
  }

  removeListeners() {
    this.buttonGo.removeEventListener(`mousedown`, this.onMouseDownButtonGo);
    this.buttonBack.removeEventListener(`mousedown`, this.onMouseDownButtonBack);
    this.inputName.removeEventListener(`keyup`, this.onKeyUpInputName);
  }

  onMouseDownButtonGo(evt) {
    evt.preventDefault();
    this.removeListeners();
    this.dispatch({status: GameStatuses.SUCCES_STATUSE, isGame: false, name: this.inputName.value});
  }

  onMouseDownButtonBack() {
    this.removeListeners();
    this.dispatch({status: GameStatuses.GO_BACK_STATUSE});
  }

}

export default RulesView;
