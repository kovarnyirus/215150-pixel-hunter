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
    const ASTERISK = this.element().querySelector(`.intro__asterisk`);
    ASTERISK.addEventListener(`mousedown`, onMousedownAsterisk(ASTERISK, dispatch()));
  }

  onMousedownAsterisk(ASTERISK, dispatch) {
    ASTERISK.removeEventListener(`mousedown`, handleMousedownAsterisk);
    dispatch({status: `succes`, isGame: IS_GAME});
  }
}

export default IntroView;
