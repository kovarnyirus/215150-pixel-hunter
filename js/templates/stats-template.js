import {AnswerTypes} from '../data/game-model';
const LENGTH_STATS = 10;

const drawStats = (stats) => {
  const arrayStats = new Array(LENGTH_STATS).fill(`<li class="stats__result stats__result--unknown"></li>`);

  stats.forEach((item, index) =>{
    if (item === AnswerTypes.SUCCESS) {
      arrayStats[index] = `<li class="stats__result stats__result--correct"></li>`;
    } else if (item === AnswerTypes.FAIL) {
      arrayStats[index] = `<li class="stats__result stats__result--wrong"></li>`;
    } else if (item === AnswerTypes.SLOW) {
      arrayStats[index] = `<li class="stats__result stats__result--slow"></li>`;
    } else if (item === AnswerTypes.FAST) {
      arrayStats[index] = `<li class="stats__result stats__result--fast"></li>`;
    }
  });
  return arrayStats.join(``);
};

const stats = (statsList) => `
      <ul class="stats">
        ${drawStats(statsList)}
      </ul>`;

export {stats};
