const LENGTHSTATS = 10;

const drawStats = (stats) => {
  const arrayStats = new Array(LENGTHSTATS).fill(`<li class="stats__result stats__result--unknown"></li>`);

  stats.forEach((item, index) =>{
    if (item === `succes`) {
      arr[index] = `<li class="stats__result stats__result--correct"></li>`;
    } else if (item === `fail`) {
      arr[index] = `<li class="stats__result stats__result--wrong"></li>`;
    } else if (item === `slow`) {
      arr[index] = `<li class="stats__result stats__result--slow"></li>`;
    } else if (item === `fast`) {
      arr[index] = `<li class="stats__result stats__result--fast"></li>`;
    }
  });
  return arrayStats.join(``);
};

const stats = (statsList) => `
      <ul class="stats">
        ${drawStats(statsList)}
      </ul>`;

export {stats};
