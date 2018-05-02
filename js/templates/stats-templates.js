import {stats} from './stats-template.js';
import {countScore, POINTS_FAST_ANSWER, POINTS_CORRECT_ANSWER, POINTS_SLOW_ANSWER, POINTS_LIVE} from '../data/game-logic';

const FAST = `fast`;
const SLOW = `slow`;
const SUCCES_ANSWER = `succes`;
const FAIL = `fail`;


const countStat = (array, searchElement) => {
  let counter = 0;
  array.forEach((item) => {
    if (item !== searchElement) {
      counter++;
    }
  });
  return counter;
};

const winTemplate = (gameData) =>
  `<div class="result">
<h1>Победа!</h1>
  <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${stats(gameData.questionStats)}
        </td>
        <td class="result__points">×&nbsp;${POINTS_CORRECT_ANSWER}</td>
        <td class="result__total">${countStat(gameData.questionStats, FAIL) * POINTS_CORRECT_ANSWER}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${countStat(gameData.questionStats, FAST)}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${POINTS_FAST_ANSWER}</td>
        <td class="result__total">${countStat(gameData.questionStats, FAST) * POINTS_FAST_ANSWER}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${gameData.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${POINTS_LIVE}</td>
        <td class="result__total">${gameData.lives * POINTS_LIVE}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${countStat(gameData.questionStats, SLOW)}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${POINTS_SLOW_ANSWER}</td>
        <td class="result__total">-${countStat(gameData.questionStats, SLOW) * POINTS_SLOW_ANSWER}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${countScore(gameData, gameData.lives)}</td>
      </tr>
    </table>
</div>`;

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


const timeOutTemplate = (gameData) =>
  `<div class="result">
<h1>Время вышло</h1>
<table class="result__table">
    <tr>
    <td class="result__number">1.</td>
    <td colspan="2">
   ${stats(gameData.questionStats)}
    </td>
    <td class="result__points">×&nbsp;${POINTS_CORRECT_ANSWER}</td>
  <td class="result__total">${countStat(gameData.questionStats, SUCCES_ANSWER) * POINTS_CORRECT_ANSWER}</td>
    </tr>
    <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
  <td class="result__extra">${gameData.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
  <td class="result__points">×&nbsp;${POINTS_LIVE}</td>
  <td class="result__total">${gameData.lives * POINTS_LIVE}</td>
    </tr>
    <tr>
    <td colspan="5" class="result__total  result__total--final">${countScore(gameData, gameData.lives)}</td>
    </tr>
    </table>
</div>`;

const historyTemplate = (gameData, index) =>
`<div class="result">
<table class="result__table">
    <tr>
    <td class="result__number">${index + 2}</td>
    <td>
    ${stats(gameData.questionStats)}
    </td>
    <td class="result__total"></td>
    <td class="result__total  result__total--final">${countScore(gameData, gameData.lives) ? countScore(gameData, gameData.lives) : `FAIL` }</td>
    </tr>
    </table>
</div>`;

export {timeOutTemplate, failTemplate, winTemplate, historyTemplate};
