import AbstractView from '../abstract-view.js';
import {headerStatistics} from './header.js';
import {templateFirst} from './game-tamplates';
import modal from './modal.js';
import {addListners, removeListners} from '../utils.js';

class gameOneView extends AbstractView {
  constructor(dispatch, levelData, stats) {
    super(dispatch);
    this._levelData = levelData;
    this._stats = stats;
    this._headerStatistics = headerStatistics;
    this._templateFirst = templateFirst;
    this._chekedOne = false;
    this._chekedTwo = false;
    this._gameImages = levelData.images;
    this._modalTemplate = modal;
    this._addListners = addListners;
    this._removeListners = removeListners;

    this.onMouseDownButtonBack = this.onMouseDownButtonBack.bind(this);
    this.onChangeInputOne = this.onChangeInputOne.bind(this);
    this.onChangeInputTwo = this.onChangeInputTwo.bind(this);
    this.onMouseDownModal = this.onMouseDownModal.bind(this);
    this.nextScreen = this.nextScreen.bind(this);

  }

  get template() {
    return this._headerStatistics(this._stats) + this._templateFirst(this._levelData, this._stats.questionStats) + this._footer + this._modalTemplate;
  }

  bind() {
    this._buttonBack = this.element.querySelector(`.header__back`);
    this._timeAnswer = this.element.querySelector(`.game__timer`);
    this._modal = this.element.querySelector(`.modal`);
    this._inputOne = this.element.querySelectorAll(`input[name="question1"]`);
    this._inputTwo = this.element.querySelectorAll(`input[name="question2"]`);

    this._buttonBack.addEventListener(`mousedown`, this.onMouseDownButtonBack);
    this._addListners(this._inputOne, `change`, this.onChangeInputOne);
    this._addListners(this._inputTwo, `change`, this.onChangeInputTwo);
    this._modal.classList.add(`modal--close`);
  }

  removeListeners() {
    this._buttonBack.removeEventListener(`mousedown`, this.onMouseDownButtonBack);
    this._removeListners(this._inputOne, `change`, this.onChangeInputOne);
    this._removeListners(this._inputTwo, `change`, this.onChangeInputTwo);

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

  nextScreen() {
    if (this._chekedOne && this._chekedTwo) {
      this.removeListeners();
      if (this._gameImages[0].type === this._chekedOne && this._gameImages[1].type === this._chekedTwo) {
        this.dispatch({status: `succes`, time: this._timeAnswer.innerText, isGame: true});
      } else {
        this.dispatch({status: `fail`, isGame: true});
      }
      this._chekedOne = false;
      this._chekedTwo = false;
    }
  }

  onChangeInputOne(evt) {
    this._chekedOne = evt.target.value;
    this.nextScreen();
  }

  onChangeInputTwo(evt) {
    this._chekedTwo = evt.target.value;
    this.nextScreen();
  }

}

export default gameOneView;
