import AbstractView from '../abstract-view.js';
import createElement from '../create-element.js';
import {HEADER} from './header.js';
import {countScore} from '../data/game-logic.js';
import {failTemplate, winTemplate, historyTemplate} from './stats-templates.js';
import {onLoadError} from '../utils.js';
import {GameStatuses} from '../dispatcher.js';

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
    this.getUserData();
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
        .then((response) => {
          if (!response.ok) {
            this._onLoadError(`Произошла ошибка, при отправлении данных.`);
          }
        })
        .catch((err) => {
          this._onLoadError(`ошибка при отправлении данных: ${err}`);
        });
  }

  _onLoad(data) {
    const serverData = data;
    const historyContainer = document.createDocumentFragment();
    const lastGameScore = this._countScore(this._stats, this._stats.lives);
    const historyTitle = document.createElement(`h2`);
    let lastGamePosition = 1;
    historyTitle.textContent = `Предыдущие результаты`;
    historyContainer.appendChild(historyTitle);

    const countingUserStatistics = serverData.map((item) => {
      item.totalPoints = this._countScore(item, item.lives);
      return item;
    });

    countingUserStatistics.sort(compareTotalPoints);

    countingUserStatistics.forEach((item, index) => {
      if (item.totalPoints > lastGameScore) {
        lastGamePosition = index + 2;
      }
      const templateElement = this._createTemplate(item.status, item, index);
      historyContainer.appendChild(createElement(templateElement));
    });

    this.resultNumber.textContent = `${lastGamePosition}`;
    this.resultContainer.appendChild(historyContainer);
  }

  _getCheckData(data) {
    return this._onLoad(data);
  }


  getUserData() {
    window.fetch(`https://es.dump.academy/pixel-hunter/stats/:${this.applicationId}-:${this._stats.userName}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            throw new Error(`Результаты прошлых игр не найдены`);
          }
          throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
        })
        .then((data) => {
          return this._getCheckData(data);
        })
        .catch((err) => {
          if (err.stack === `TypeError: Failed to fetch`) {
            return this._onLoadError(`Сервер со статистикой недоступен`);
          } else if (err === `Результаты прошлых игр не найдены`) {
            return this._onLoadError(err);
          }
          return this._onLoadError(`Неизвестная ошибка: ${err} свяжитесь с администратором`);
        });
  }

  _createTemplate(gameStatus, stats, index) {
    if (gameStatus === GameStatuses.FAIL) {
      this._html = failTemplate(stats);
    } else if (gameStatus === GameStatuses.HISTORY) {
      this._html = historyTemplate(stats, index);
    } else {
      this._html = winTemplate(stats);
    }
    return this._html;
  }

  get template() {
    return `${this._header} ${this._createTemplate(this._status, this._stats)} ${this._footer}`;
  }

  bind() {
    this.buttonBack = this.element.querySelector(`.header__back`);
    this.resultNumber = this.element.querySelector(`.result__number`);
    this.resultContainer = this.element.querySelector(`.result`);
    this.buttonBack.addEventListener(`mousedown`, this.onMouseDownButtonBack);
  }

  onMouseDownButtonBack() {
    this.buttonBack.removeEventListener(`mousedown`, this.onMouseDownButtonBack);
    this.dispatch({status: GameStatuses.GO_BACK, isGame: false});
  }

}

export default StatsView;
