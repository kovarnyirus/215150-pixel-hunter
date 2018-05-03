import AbstractView from '../abstract-view.js';
import createElement from '../createElement.js';
import {header} from './header.js';
import {countScore} from '../data/game-logic.js';
import {timeOutTemplate, failTemplate, winTemplate, historyTemplate} from './stats-templates.js';

class StatsView extends AbstractView {
  constructor(dispatch, status, stats) {
    super(dispatch);
    this._status = status;
    this._stats = stats;
    this._header = header;
    this.applicationId = 215150;
    this._html = ``;
    this._countScore = countScore;
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
    let serverData = data;
    let userStatistics = [];
    let countingUserStatistics = []
    let historyContainer = document.createDocumentFragment();

    const historyTitle = document.createElement(`h2`);
    historyTitle.textContent = `Предыдущие результаты`;
    historyContainer.appendChild(historyTitle);

    countingUserStatistics =  serverData.map((item, index) => {
      let score =  this._countScore(item, item.lives);
      item.totalPoints = score;
      return item;
  });
    console.log(serverData);
    console.log(countingUserStatistics);

    serverData.forEach((item, index) => {
      userStatistics.push(this._createTemplate(item.status, item, index));
    });

    userStatistics.forEach((item) => {
      historyContainer.appendChild(createElement(item));
    });
    this.resultContainer.appendChild(historyContainer);
  }

  getDataUser() {
    const onLoad = this._onLoad;
    let serverData;
    window.fetch(`https://es.dump.academy/pixel-hunter/stats/:${this.applicationId}-:${this._stats.userName}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          if (data) {
            serverData = data;
            onLoad(serverData);
          }
        })
        .catch((err) => {
          throw new Error(`${err}`);
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
    this.resultContainer = this.element.querySelector(`.result`);
    this.buttonBack.addEventListener(`mousedown`, this.onMouseDownButtonBack);
  }

  onMouseDownButtonBack() {
    this.buttonBack.removeEventListener(`mousedown`, this.onMouseDownButtonBack);
    this.dispatch({status: `goBack`, isGame: false});
  }

}

export default StatsView;
