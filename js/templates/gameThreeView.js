import AbstractView from '../abstract-view.js';
import {headerStatistics} from './header.js';
import {templateThird} from './game-tamplates';
import modal from './modal.js';
import {addListners, removeListners} from '../utils.js';

class gameThreeView extends AbstractView {
  constructor(dispatch, levelData, stats) {
    super(dispatch);
    this._levelData = levelData;
    this._stats = stats;
    this._headerStatistics = headerStatistics;
    this._templateThird = templateThird;
    this._addListners = addListners;
    this._removeListners = removeListners;
    this._modalTemplate = modal;

    this.onMouseDownButtonBack = this.onMouseDownButtonBack.bind(this);
    this.onMouseDownModal = this.onMouseDownModal.bind(this);
    this.onMouseDownGameCard = this.onMouseDownGameCard.bind(this);

  }

  get template() {
    return this._headerStatistics(this._stats) + this._templateThird(this._levelData, this._stats.questionStats) + this._footer + this._modalTemplate;
  }

  bind() {
    this.buttonBack = this.element.querySelector(`.header__back`);
    this.gameCard = this.element.querySelectorAll(`.game__option`);
    this._modal = this.element.querySelector(`.modal`);
    this._timeAnswer = this.element.querySelector(`.game__timer`);
    this.buttonBack.addEventListener(`mousedown`, this.onMouseDownButtonBack);
    this._addListners(this.gameCard, this.onMouseDownGameCard);
    this._modal.classList.add(`modal--close`);
  }

  removeListeners() {
    this._removeListners(this.gameCard, this.onMouseDownGameCard);
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
      this.dispatch({status: `goBack`, isGame: true});
    } else {
      this.removeModalListener();
      this._modal.classList.add(`modal--close`);
    }
  }

  onMouseDownGameCard(evt) {
    this.removeListeners();
    let correctAnswer;
    let imgTypeCounter = () => {
      let counterPaint = 0;
      let counterPhoto = 0;
      this.gameCard.forEach((item) => {
        if (item.children[0].attributes[2].value === `paint`) {
          counterPaint++;
        } else {
          counterPhoto++;
        }
      });
      correctAnswer = counterPhoto > counterPaint ? `paint` : `photo`;
    };
    imgTypeCounter();
    if (evt.target.attributes[2].value === correctAnswer) {
      this.dispatch({status: `succes`, time: this._timeAnswer.innerText, isGame: true});
    } else {
      this.dispatch({status: `fail`, isGame: true});
    }

  }

}

export default gameThreeView;
