import AbstractView from '../abstract-view.js';
import {headerStatistics} from './header.js';
import {templateSecond} from './game-templates';
import MODAL from './modal.js';
import {GameStatuses} from '../dispatcher.js';

class GameTwoView extends AbstractView {
  constructor(dispatch, levelData, stats) {
    super(dispatch);
    this._levelData = levelData;
    this._stats = stats;
    this._headerStatistics = headerStatistics;
    this._templateSecomnd = templateSecond;
    this._gameImages = levelData.images;
    this.onMouseDownButtonBack = this.onMouseDownButtonBack.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onMouseDownModal = this.onMouseDownModal.bind(this);
    this._modaltemplate = MODAL;
  }

  get template() {
    return `${this._headerStatistics(this._stats)} ${this._templateSecomnd(this._levelData, this._stats.questionStats)} ${this._footer} ${this._modaltemplate}`;
  }

  bind() {
    this._buttonBack = this.element.querySelector(`.header__back`);
    this._timeAnswer = this.element.querySelector(`.game__timer`);
    this._gameContent = this.element.querySelector(`.game__content`);
    this._modal = this.element.querySelector(`.modal`);
    this._buttonBack.addEventListener(`mousedown`, this.onMouseDownButtonBack);
    this._gameContent.addEventListener(`change`, this.onChangeInput);
    this._modal.classList.add(`modal--close`);
  }

  removeListeners() {
    this._buttonBack.removeEventListener(`mousedown`, this.onMouseDownButtonBack);
    this._gameContent.removeEventListener(`change`, this.onChangeInput);
  }

  removeModalListener() {
    this._modal.removeEventListener(`mousedown`, this.onMouseDownModal);
  }

  onMouseDownButtonBack() {
    this._modal.classList.remove(`modal--close`);
    this._modal.addEventListener(`mousedown`, this.onMouseDownModal);
  }

  onMouseDownModal(evt) {
    if (evt.target.className === `back`) {
      this.removeListeners();
      this.removeModalListener();
      this.dispatch({status: GameStatuses.GO_BACK_STATUSE, isGame: true});
    } else {
      this.removeModalListener();
      this._modal.classList.add(`modal--close`);
    }
  }

  onChangeInput(evt) {
    this.removeListeners();
    if (this._gameImages[0].type === evt.target.value) {
      this.dispatch({status: GameStatuses.SUCCES_STATUSE, time: this._timeAnswer.innerText, isGame: true});
    } else {
      this.dispatch({status: GameStatuses.FAIL_STATUSE, isGame: true});
    }
  }
}

export default GameTwoView;
