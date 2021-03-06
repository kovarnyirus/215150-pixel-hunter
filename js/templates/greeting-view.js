import AbstractView from '../abstract-view.js';
import {GameStatuses} from '../dispatcher.js';

class GreetingView extends AbstractView {
  constructor(dispatch) {
    super(dispatch);
    this.onMouseDownGreeting = this.onMouseDownGreeting.bind(this);
  }

  get template() {
    return `<div class="greeting central--blur">
    <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
    <h1 class="greeting__asterisk">*</h1>
    <div class="greeting__challenge">
      <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
      <p>Правила игры просты.<br>
        Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
        Задача кажется тривиальной, но не думай, что все так просто.<br>
        Фотореализм обманчив и коварен.<br>
        Помни, главное — смотреть очень внимательно.</p>
    </div>
    <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
  </div>
      ${this._footer}`;
  }

  bind() {
    this._nextBtn = this.element.querySelector(`.greeting__continue`);
    this._nextBtn.addEventListener(`mousedown`, this.onMouseDownGreeting);
  }

  onMouseDownGreeting() {
    this._nextBtn.removeEventListener(`mousedown`, this.onMouseDownGreeting);
    this.dispatch({status: GameStatuses.SUCCES, isGame: false});
  }
}

export default GreetingView;
