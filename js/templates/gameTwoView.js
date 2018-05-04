import AbstractView from '../abstract-view.js';
import {headerStatistics} from './header.js';
import {templateSecomnd} from './game-tamplates';
import modal from './modal.js';
import {addListners, removeListners} from '../utils.js';

class gameTwoView extends AbstractView {
  constructor(dispatch, levelData, stats) {
    super(dispatch);
    this._levelData = levelData;
    this._stats = stats;
    this._headerStatistics = headerStatistics;
    this._templateSecomnd = templateSecomnd;
    this._gameImages = levelData.images;
    this._addListners = addListners;
    this._removeListners = removeListners;
    this.onMouseDownButtonBack = this.onMouseDownButtonBack.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onMouseDownModal = this.onMouseDownModal.bind(this);
    this._modaltemplate = modal;
  }

  get template() {
    return this._headerStatistics(this._stats) + this._templateSecomnd(this._levelData, this._stats.questionStats) + this._footer + this._modaltemplate;
  }

  bind() {
    this._buttonBack = this.element.querySelector(`.header__back`);
    this._timeAnswer = this.element.querySelector(`.game__timer`);
    this._inputQuestion = this.element.querySelectorAll(`input`);
    this._modal = this.element.querySelector(`.modal`);
    this._buttonBack.addEventListener(`mousedown`, this.onMouseDownButtonBack);
    this._addListners(this._inputQuestion, `change`, this.onChangeInput);
    this._modal.classList.add(`modal--close`);
  }

  removeListeners() {
    this._buttonBack.removeEventListener(`mousedown`, this.onMouseDownButtonBack);
    this._removeListners(this._inputQuestion, `change`, this.onChangeInput);
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
      this.dispatch({status: `goBack`, isGame: true});
    } else {
      this.removeModalListener();
      this._modal.classList.add(`modal--close`);
    }
  }

  onChangeInput(evt) {
    this.removeListeners();
    if (this._gameImages[0].type === evt.target.value) {
      this.dispatch({status: `succes`, time: this._timeAnswer.innerText, isGame: true});
    } else {
      this.dispatch({status: `fail`, isGame: true});
    }
  }
}

export default gameTwoView;
