const headerStatistics = (state) =>
  `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    <h1 class="game__timer"></h1>
    <div class="game__lives">
    ${new Array(3 - state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    ${new Array(state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    </div>
  </header>`;

const HEADER = `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" alt="Back" width="45" height="45">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>`;

export {headerStatistics, HEADER};
