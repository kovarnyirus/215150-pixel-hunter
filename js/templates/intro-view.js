import AbstractView from '../abstract-view.js';
import {GameStatuses} from '../dispatcher.js';

class IntroView extends AbstractView {
  constructor(dispatch, levelData) {
    super(dispatch);
    this._levelData = levelData;
    this.onMousedownAsterisk = this.onMousedownAsterisk.bind(this);
  }


  get template() {
    return `<div id="main" class="central__content"> 
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">${this._levelData.dataLoaded ? `*` : `загрузка`}</h1>
        <img src="" alt="" width="50">
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
    this.dispatch({status: GameStatuses.SUCCES, isGame: false});
  }
}

export default IntroView;
