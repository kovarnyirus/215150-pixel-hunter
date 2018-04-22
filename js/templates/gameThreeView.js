import AbstractView from '../abstract-view.js';
import {headerStatistics} from './header.js';
import {templateThird} from './game-tamplates';

class gameThreeView extends AbstractView {
  constructor(dispatch, levelData, stats) {
    super(dispatch);
    this._levelData = levelData;
    this._stats = stats;
    this._headerStatistics = headerStatistics;
    this._templateThird = templateThird;
    this._timeAnswer = 20;

    this.onMouseDownButtonBack = this.onMouseDownButtonBack.bind(this);
    this.onMouseDownGameCard = this.onMouseDownGameCard.bind(this);

  }

  get template() {
    return this._headerStatistics(this._stats) + this._templateThird(this._levelData, this._stats.questionStats) + this._footer;
  }

  bind() {
    this.buttonBack = this.element.querySelector(`.header__back`);
    this.gameCard = this.element.querySelectorAll(`.game__option`);
    this.buttonBack.addEventListener(`mousedown`, this.onMouseDownButtonBack);
    this.gameCard[0].addEventListener(`mousedown`, this.onMouseDownGameCard);
    this.gameCard[1].addEventListener(`mousedown`, this.onMouseDownGameCard);
    this.gameCard[2].addEventListener(`mousedown`, this.onMouseDownGameCard);
  }

  removeListeners() {
    this.gameCard[0].removeEventListener(`change`, this.onMouseDownGameCard);
    this.gameCard[1].removeEventListener(`change`, this.onMouseDownGameCard);
    this.gameCard[2].removeEventListener(`change`, this.onMouseDownGameCard);
    this.buttonBack.removeEventListener(`mousedown`, this.onMouseDownButtonBack);
  }

  onMouseDownButtonBack() {
    this.removeListeners();
    this.dispatch({status: `goBack`});
  }

  onMouseDownGameCard(evt) {
    this.removeListeners();
    if (evt.target.attributes[2].value === this._levelData.correctAnswer) {
      this.dispatch({status: `succes`, time: this._timeAnswer, isGame: true});
    } else {
      this.dispatch({status: `fail`});
    }

  }

}

export default gameThreeView;
