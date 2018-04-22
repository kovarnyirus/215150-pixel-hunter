import AbstractView from '../abstract-view.js';

class IntroView extends AbstractView {
  constructor() {
    super();
    this._dispatch;
    this._footer;
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
    const ASTERISK = this.element().querySelector(`.intro__asterisk`);
    const handleMousedownAsterisk = onMousedownAsterisk(ASTERISK, this._dispatch);
    ASTERISK.addEventListener(`mousedown`, onMousedownAsterisk(handleMousedownAsterisk));
  }
}

export default IntroView;
