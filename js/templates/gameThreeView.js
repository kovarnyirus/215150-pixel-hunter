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

    this.onMouseDownButtonBack = this.onMouseDownButtonBack.bind(this);
    this.onMouseDownGameCard = this.onMouseDownGameCard.bind(this);

  }

  get template() {
    return this._headerStatistics(this._stats) + this._templateThird(this._levelData, this._stats.questionStats) + this._footer;
  }

  bind() {
    this.buttonBack = this.element.querySelector(`.header__back`);
    this.gameCard = this.element.querySelectorAll(`.game__option`);
    console.log(this.gameCard);
    console.log(this._levelData);
    this._timeAnswer = this.element.querySelector(`.game__timer`);
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
    this.dispatch({status: `goBack`, isGame: true});
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
