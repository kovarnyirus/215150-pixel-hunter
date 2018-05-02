import AbstractView from '../abstract-view.js';
import createElement from '../createElement.js';
import {header} from './header.js';
import {timeOutTemplate, failTemplate, winTemplate} from './stats-templates.js';

class StatsView extends AbstractView {
  constructor(dispatch, status, stats) {
    super(dispatch);
    this._status = status;
    this._stats = stats;
    this._header = header;
    this.applicationId = 215150;
    this.templates = [];
    this._html = ``;
    this._serverStats = [];
    this.statThisUser = false;
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
        'status': this._status
      }),
      headers: {
        'Content-Type': `application/json`
      }
    }).
        then((response) => console.log(response.ok ? `Sent` : `Not sent`)).
        catch((err) => console.error(err));
  }

  _onLoad(data) {
    let serverData = data;
    let userStatistics = [];
    serverData.forEach((item) => {
      userStatistics.push(this._createTemplate(item.status, item));
    });
    console.log(serverData);
    console.log(userStatistics);
    userStatistics.forEach((item) => {
      this.resultContainer.appendChild(createElement(item));
    })
    // this._createTemplate()
  }

  getDataUser() {
    const onLoad = this._onLoad;
    let serverData;
    window.fetch(`https://es.dump.academy/pixel-hunter/stats/:${this.applicationId}-:${this._stats.userName}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            throw new Error(`файлы не найдены`);
          }
          throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
        })
        .then((data) => {
          serverData = data;
          console.log(serverData);
          onLoad(serverData);
        })
        .catch((err) => {
          console.log(err);
          this.statThisUser = false;
        });
  }

  // _templates() {
  //   this.templates.push(this._createTemplate(this._status, this._stats));
  //   console.log(this._serverStats);
  //   this._serverStats.forEach((item) => {
  //     this.templates.push(this._createTemplate(item.status, item));
  //   });
  //   return this.templates;
  //
  // }

  _createTemplate(statusGame, stats) {
    if (statusGame === `fail`) {
      this._html = failTemplate(stats);
    } else if (statusGame === `timeOut`) {
      this._html = timeOutTemplate(stats);
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
