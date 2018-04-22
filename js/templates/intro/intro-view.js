import AbstractView from '../../abstract-view.js';

export default class IntroView extends AbstractView {
  constructor(dispatch) {
    super();
    this.dispatch = dispatch;
  }

  get template() {
    return `<div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
       </div>
    </div>
      ${super.footer()}`;
  }

  bind() {
    const ASTERISK = this.element().querySelector(`.intro__asterisk`);
    ASTERISK.addEventListener(`mousedown`,  onMousedownAsterisk(ASTERISK, this.dispatch));
  }

  onMousedownAsterisk(ASTERISK, dispatch) {

  }
};
