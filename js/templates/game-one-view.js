import AbstractView from '../abstract-view.js';
import {headerStatistics} from './header.js';
import {templateFirst} from './game-templates';
import MODAL from './modal.js';
import {GameStatuses} from '../dispatcher.js';

const Questions = {
  QUESTION_ONE: `question1`,
  QUESTION_TWO: `question2`
};

class GameOneView extends AbstractView {
  constructor(dispatch, levelData, stats) {
    super(dispatch);
    this._levelData = levelData;
    this._stats = stats;
    this._headerStatistics = headerStatistics;
    this._templateFirst = templateFirst;
    this._chekedOne = false;
    this._chekedTwo = false;
    this._gameImages = levelData.images;
    this._modalTemplate = MODAL;
    this.onMouseDownButtonBack = this.onMouseDownButtonBack.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onMouseDownModal = this.onMouseDownModal.bind(this);
    this.setNextScreen = this.setNextScreen.bind(this);
  }

  get template() {
    return `${this._headerStatistics(this._stats)} ${this._templateFirst(this._levelData, this._stats.questionStats)} ${this._footer} ${this._modalTemplate}`;
  }

  bind() {
    this._buttonBack = this.element.querySelector(`.header__back`);
    this._timeAnswer = this.element.querySelector(`.game__timer`);
    this._modal = this.element.querySelector(`.modal`);
    this._gameContent = this.element.querySelector(`.game__content`);

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

  setNextScreen() {
    if (this._chekedOne && this._chekedTwo) {
      this.removeListeners();
      if (this._gameImages[0].type === this._chekedOne && this._gameImages[1].type === this._chekedTwo) {
        this.dispatch({status: GameStatuses.SUCCES_STATUSE, time: this._timeAnswer.innerText, isGame: true});
      } else {
        this.dispatch({status: GameStatuses.FAIL_STATUSE, isGame: true});
      }
      this._chekedOne = false;
      this._chekedTwo = false;
    }
  }

  onChangeInput(evt) {
    if (evt.target.name === Questions.QUESTION_ONE) {
      this._chekedOne = evt.target.value;
    } else if (evt.target.name === Questions.QUESTION_TWO) {
      this._chekedTwo = evt.target.value;
    }
    this.setNextScreen();
  }

}

export default GameOneView;
