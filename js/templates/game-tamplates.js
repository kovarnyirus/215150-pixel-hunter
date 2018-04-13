import {stats} from './stats-template.js';
import {statsList} from '../data.js';

const templateFirst = (data) => {
 return  `<div class="game">
    <p class="game__task">${data.title}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${data.images[0].figure}" alt="Option 1" width="468" height="458">
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
        <img src="${data.images[1].photo}" alt="Option 2" width="468" height="458">
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
  </div>
  ${stats(statsList)}
  `
}


const templateSecomnd = (data) => `<div class="game">
    <p class="game__task">${data.title}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${data.images[0].figure}" alt="Option 1" width="705" height="455">
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
     ${stats(statsList)}
  </div>
  `;

const templateThird = (data) => `
  <div class="game">
    <p class="game__task">${data.title}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${data.images[0].figure}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${data.images[1].photo}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${data.images[2].photo}" alt="Option 1" width="304" height="455">
      </div>
    </form>
    ${stats(statsList)}
  </div>
  `;

export {templateFirst, templateSecomnd, templateThird};
