import AbstractView from '../abstract-view.js';

class IntroView extends AbstractView {
  constructor(dispatch) {
    super(dispatch);
    this.ASTERISK = this.element().querySelector(`.intro__asterisk`);
    this.ASTERISK.addEventListener(`mousedown`, onMousedownAsterisk(this._dispatch )) = this.onMousedownAsterisk
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
    // const ASTERISK = this.element().querySelector(`.intro__asterisk`);
    // ASTERISK.addEventListener(`mousedown`, onMousedownAsterisk(ASTERISK, this._dispatch ));
  }
    onMousedownAsterisk(){
    }
  }
}

export default IntroView;
