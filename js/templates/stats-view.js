import AbstractView from '../abstract-view.js';
import createElement from '../create-element.js';
import {HEADER} from './header.js';
import {countScore} from '../data/game-logic.js';
import {timeOutTemplate, failTemplate, winTemplate, historyTemplate} from './stats-templates.js';
import {onLoadError} from '../utils.js';

const compareTotalPoints = (itemOne, itemTwo) => {
  return itemTwo.totalPoints - itemOne.totalPoints;
};

class StatsView extends AbstractView {
  constructor(dispatch, status, stats) {
    super(dispatch);
    this._status = status;
    this._stats = stats;
    this._header = HEADER;
    this.applicationId = 215150;
    this._html = ``;
    this._countScore = countScore;
    this._onLoadError = onLoadError;
    this._onLoad = this._onLoad.bind(this);
    this.onMouseDownButtonBack = this.onMouseDownButtonBack.bind(this);
    this.getDataUser();
    this.postData();
  }

  postData() {
    fetch(`https://es.dump.academy/pixel-hunter/stats/:${this.applicationId}-:${this._stats.userName}`, {
      method: `POST`,
      body: JSON.stringify({
        'questionStats': this._stats.questionStats,
        'lives': this._stats.lives,
        'status': `historyGame`,
        'answers': this._stats.answers,
        'time': this._stats.time
      }),
      headers: {
        'Content-Type': `application/json`
      }
    })
        .catch((err) => {
          throw new Error(`${err}`);
        });
  }

  _onLoad(data) {
    const serverData = data;
    const historyContainer = document.createDocumentFragment();
    const scoreLastGame = this._countScore(this._stats, this._stats.lives);
    const historyTitle = document.createElement(`h2`);
    let positionLastGame = 1;
    let countingUserStatistics = [];
    historyTitle.textContent = `Предыдущие результаты`;
    historyContainer.appendChild(historyTitle);

    countingUserStatistics = serverData.map((item) => {
      let score = this._countScore(item, item.lives);
      item.totalPoints = score;
      return item;
    });

    countingUserStatistics.sort(compareTotalPoints);

    countingUserStatistics.forEach((item, index) => {
      let element;
      if (item.totalPoints > scoreLastGame) {
        positionLastGame = index + 2;
      }
      element = this._createTemplate(item.status, item, index);
      historyContainer.appendChild(createElement(element));
    });

    this.resultNumber.textContent = `${positionLastGame}`;
    this.resultContainer.appendChild(historyContainer);
  }

  static _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return false;
  }

  _checkData(data) {
    const onLoad = this._onLoad;
    let serverData;
    if (data) {
      serverData = data;
      return onLoad(serverData);
    }
    return false;
  }


  getDataUser() {
    window.fetch(`https://es.dump.academy/pixel-hunter/stats/:${this.applicationId}-:${this._stats.userName}`)
        .then((response) => {
          return StatsView._checkResponse(response);
        })
        .then((data) => {
          return this._checkData(data);
        })
        .catch((err) => {
          if (err.stack === `TypeError: Failed to fetch`) {
            return this._onLoadError(`Сервер со статистикой недоступен`);
          }
          return this._onLoadError(`Неизвестная ошибка: ${err} свяжитесь с администратором`);
        });
  }

  _createTemplate(statusGame, stats, index) {
    if (statusGame === `fail`) {
      this._html = failTemplate(stats);
    } else if (statusGame === `timeOut`) {
      this._html = timeOutTemplate(stats);
    } else if (statusGame === `historyGame`) {
      this._html = historyTemplate(stats, index);
    } else {
      this._html = winTemplate(stats);
    }
    return this._html;
  }

  get template() {
    return this._header + this._createTemplate(this._status, this._stats) + this._footer;
  }

  bind() {
    this.buttonBack = this.element.querySelector(`.header__back`);
    this.resultNumber = this.element.querySelector(`.result__number`);
    this.resultContainer = this.element.querySelector(`.result`);
    this.buttonBack.addEventListener(`mousedown`, this.onMouseDownButtonBack);
  }

  onMouseDownButtonBack() {
    this.buttonBack.removeEventListener(`mousedown`, this.onMouseDownButtonBack);
    this.dispatch({status: `goBack`, isGame: false});
  }

}

export default StatsView;
