const lengthStats = 10;

const drawStats = (stats) => {
  const arr = new Array(lengthStats).fill(`<li class="stats__result stats__result--unknown"></li>`);
  stats.forEach((item, i) =>{
    if (item === `succes`) {
      arr[i] = `<li class="stats__result stats__result--correct"></li>`;
    } else if (item === `fail`) {
      arr[i] = `<li class="stats__result stats__result--wrong"></li>`;
    } else if (item === `slow`) {
      arr[i] = `<li class="stats__result stats__result--slow"></li>`;
    } else if (item === `fast`) {
      arr[i] = `<li class="stats__result stats__result--fast"></li>`;
    }
  });
  return arr.join(``);
};

const stats = (statsList) => `
      <ul class="stats">
        ${drawStats(statsList)}
      </ul>`;

export {stats};
