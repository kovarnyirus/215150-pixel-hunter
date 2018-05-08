import {stats} from './stats-template.js';
import {countScore, StatPoints} from '../data/game-logic';
import {AnswerTypes} from '../data/game-model.js';

const countStat = (array) => {
  const counter = {
    fast: 0,
    slow: 0,
    total: 0
  };

  for (let item of array) {
    if (item === AnswerTypes.FAST) {
      counter.fast++;
      counter.total++;
    } else if (item === AnswerTypes.SLOW) {
      counter.slow++;
      counter.total++;
    }
  }
  return counter;
};

const winTemplate = (gameData) => {
  const countedStats = countStat(gameData.questionStats);
  return `<div class="result">
<h1>Победа!</h1>
  <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${stats(gameData.questionStats)}
        </td>
        <td class="result__points">×&nbsp;${StatPoints.CORRECT_ANSWER}</td>
        <td class="result__total">${countedStats.total * StatPoints.CORRECT_ANSWER}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${countedStats.fast}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${StatPoints.FAST_ANSWER}</td>
        <td class="result__total">${countedStats.fast * StatPoints.FAST_ANSWER}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${gameData.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${StatPoints.LIVE}</td>
        <td class="result__total">${gameData.lives * StatPoints.LIVE}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${countedStats.slow}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${StatPoints.SLOW_ANSWER}</td>
        <td class="result__total">-${countedStats.slow * StatPoints.SLOW_ANSWER}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${countScore(gameData, gameData.lives)}</td>
      </tr>
    </table>
</div>`;
};


const failTemplate = (gameData) =>
  `<div class="result">
<h1>Поражение!</h1>
<table class="result__table">
    <tr>
    <td class="result__number">1.</td>
    <td>
    ${stats(gameData.questionStats)}
    </td>
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>
    </tr>
    </table>
</div>`;

const historyTemplate = (gameData, index) =>
  `<div class="result">
<table class="result__table">
    <tr>
    <td class="result__number">${index + 1}</td>
    <td>
    ${stats(gameData.questionStats)}
    </td>
    <td class="result__total"></td>
    <td class="result__total  result__total--final">${countScore(gameData, gameData.lives) ? countScore(gameData, gameData.lives) : `FAIL` }</td>
    </tr>
    </table>
</div>`;

export {failTemplate, winTemplate, historyTemplate};
