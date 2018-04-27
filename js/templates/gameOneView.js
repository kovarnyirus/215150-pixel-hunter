import AbstractView from '../abstract-view.js';
import {headerStatistics} from './header.js';
import {templateFirst} from './game-tamplates';

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

    this.onMouseDownButtonBack = this.onMouseDownButtonBack.bind(this);
    this.onChangeInputOne = this.onChangeInputOne.bind(this);
    this.onChangeInputTwo = this.onChangeInputTwo.bind(this);
    this.nextScreen = this.nextScreen.bind(this);

  }

  get template() {
    return this._headerStatistics(this._stats) + this._templateFirst(this._levelData, this._stats.questionStats) + this._footer;
  }

  bind() {
    this._buttonBack = this.element.querySelector(`.header__back`);
    this._timeAnswer = this.element.querySelector(`.game__timer`);
    this._inputOne = this.element.querySelectorAll(`input[name="question1"]`);
    this._inputTwo = this.element.querySelectorAll(`input[name="question2"]`);

    this._buttonBack.addEventListener(`mousedown`, this.onMouseDownButtonBack);
    this._inputOne[0].addEventListener(`change`, this.onChangeInputOne);
    this._inputOne[1].addEventListener(`change`, this.onChangeInputOne);
    this._inputTwo[0].addEventListener(`change`, this.onChangeInputTwo);
    this._inputTwo[1].addEventListener(`change`, this.onChangeInputTwo);
  }

  removeListeners() {
    this._buttonBack.removeEventListener(`mousedown`, this.onMouseDownButtonBack);
    this._inputOne[0].removeEventListener(`mousedown`, this.onChangeInputOne);
    this._inputOne[1].removeEventListener(`mousedown`, this.onChangeInputOne);
    this._inputTwo[0].removeEventListener(`mousedown`, this.onChangeInputTwo);
    this._inputTwo[1].removeEventListener(`mousedown`, this.onChangeInputTwo);
  }

  onMouseDownButtonBack() {
    this.removeListeners();
    this.dispatch({status: `goBack`, isGame: true});
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
