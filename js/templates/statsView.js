import AbstractView from '../abstract-view.js';
import {header} from './header.js';
import {timeOutTemplate, failTemplate, winTemplate} from './stats-templates.js';

class statsView extends AbstractView {
  constructor(dispatch, status, stats) {
    super(dispatch);
    this._status = status;
    this._stats = stats;
    this._header = header;
    this._html = ``;
    this.onMouseDownButtonBack = this.onMouseDownButtonBack.bind(this);
  }

  get template() {

    if (this._status === `fail`) {
      this._html = failTemplate(this._stats);
    } else {
      this._html = winTemplate(this._stats);
    }

    return this._header + this._html + this._footer;
  }

  bind() {
    this.buttonBack = this.element.querySelector(`.header__back`);
    this.buttonBack.addEventListener(`mousedown`, this.onMouseDownButtonBack);
  }

  onMouseDownButtonBack() {
    this.buttonBack.removeEventListener(`mousedown`, this.onMouseDownButtonBack);
    this.dispatch({status: `goBack`, isGame: false});
  }

}

export default statsView;
