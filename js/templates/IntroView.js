import AbstractView from '../abstract-view.js';

class IntroView extends AbstractView {
  constructor(dispatch) {
    super(dispatch);
    this.onMousedownAsterisk = this.onMousedownAsterisk.bind(this);
  }

  get template() {
    return `<div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
       </div>
    </div>
      ${this._footer}`;
  }

  bind() {
    this._ASTERISK = this.element.querySelector(`.intro__asterisk`);
    this._ASTERISK.addEventListener(`mousedown`, this.onMousedownAsterisk);
  }

  onMousedownAsterisk() {
    this._ASTERISK.removeEventListener(`mousedown`, this.onMousedownAsterisk);
    this.dispatch({status: `succes`, isGame: false});
  }
}

export default IntroView;
