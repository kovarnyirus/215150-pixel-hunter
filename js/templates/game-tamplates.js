import {stats} from './stats-template.js';

const templateFirst = (data, statsData) => {
  return `<div class="game">
    <p class="game__task">${data.title}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${data.images[0].src}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${data.images[1].src}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${stats(statsData)}
  </div>
  `;
};


const templateSecomnd = (data, statsData) => `<div class="game">
    <p class="game__task">${data.title}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${data.images[0].src}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${stats(statsData)}
  </div>
  `;

const templateThird = (data, statsData) => `
  <div class="game">
    <p class="game__task">${data.title}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${data.images[0].src}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${data.images[1].src}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${data.images[2].src}" alt="Option 1" width="304" height="455">
      </div>
    </form>
  ${stats(statsData)}
  </div>
  `;

export {templateFirst, templateSecomnd, templateThird};
