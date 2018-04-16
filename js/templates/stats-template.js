const lengthStats = 10;

const drawStats = (stats) => {
  const arr = new Array(lengthStats).fill(`<li class="stats__result stats__result--unknown"></li>`);
  let resultArr = stats.forEach((item, i) =>{
    if (item === `true`) {
      arr[i] = `<li class="stats__result stats__result--correct"></li>`;
    } else if (item === `false`) {
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
  <div class="stats">
      <ul class="stats">
        ${drawStats(statsList)}
      </ul>
    </div>
  </div>`;

export {stats};
