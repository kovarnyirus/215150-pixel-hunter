import AbstractView from '../abstract-view.js';
import {headerStatistics} from './header.js';
import {templateThird} from './game-templates';
import MODAL from './modal.js';
import {GameStatuses} from '../dispatcher.js';

const AnswerTypes = {
  PAINT: `paint`,
  PHOTO: `photo`
};

class GameThreeView extends AbstractView {
  constructor(dispatch, levelData, stats) {
    super(dispatch);
    this._levelData = levelData;
    this._stats = stats;
    this._headerStatistics = headerStatistics;
    this._templateThird = templateThird;
    this._modalTemplate = MODAL;

    this.onMouseDownButtonBack = this.onMouseDownButtonBack.bind(this);
    this.onMouseDownModal = this.onMouseDownModal.bind(this);
    this.onMouseDownGameCard = this.onMouseDownGameCard.bind(this);

  }

  get template() {
    return `${this._headerStatistics(this._stats)} ${this._templateThird(this._levelData, this._stats.questionStats)} ${this._footer} ${this._modalTemplate}`;
  }

  bind() {
    this.buttonBack = this.element.querySelector(`.header__back`);
    this.gameCards = this.element.querySelectorAll(`.game__option`);
    this._gameContent = this.element.querySelector(`.game__content`);
    this._modal = this.element.querySelector(`.modal`);
    this._timeAnswer = this.element.querySelector(`.game__timer`);
    this.buttonBack.addEventListener(`mousedown`, this.onMouseDownButtonBack);
    this._gameContent.addEventListener(`mousedown`, this.onMouseDownGameCard);
    this._modal.classList.add(`modal--close`);
  }

  removeListeners() {
    this._gameContent.removeEventListener(`mousedown`, this.onMouseDownGameCard);
    this.buttonBack.removeEventListener(`mousedown`, this.onMouseDownButtonBack);
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
      this.dispatch({status: GameStatuses.GO_BACK, isGame: true});
    } else {
      this.removeModalListener();
      this._modal.classList.add(`modal--close`);
    }
  }

  onMouseDownGameCard(evt) {
    this.removeListeners();
    let correctAnswer;
    const getImageTypes = () => {
      let counterPaint = 0;
      let counterPhoto = 0;

      for (let gameCard of this.gameCards) {
        if (gameCard.children[0].attributes[2].value === AnswerTypes) {
          counterPaint++;
        } else {
          counterPhoto++;
        }
      }
      correctAnswer = counterPhoto > counterPaint ? AnswerTypes.PAINT : AnswerTypes.PHOTO;
    };
    getImageTypes();
    if (evt.target.attributes[2].value === correctAnswer) {
      this.dispatch({status: GameStatuses.SUCCES, time: this._timeAnswer.innerText, isGame: true});
    } else {
      this.dispatch({status: GameStatuses.FAIL, isGame: true});
    }

  }

}

export default GameThreeView;
