import createElement from '../createElement.js';
import FOOTER from './footer.js';

const IS_GAME = false;
const html = `<div class="greeting central--blur">
    <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
    <h1 class="greeting__asterisk">*</h1>
    <div class="greeting__challenge">
      <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
      <p>Правила игры просты.<br>
        Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
        Задача кажется тривиальной, но не думай, что все так просто.<br>
        Фотореализм обманчив и коварен.<br>
        Помни, главное — смотреть очень внимательно.</p>
    </div>
    <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
  </div>`;

const template = html + FOOTER;


const greeting = createElement(template);
let handleMousedownGreeting;

const onMouseDownGreeting = (nextBtn, handlerDispatcher) => () => {
  nextBtn.removeEventListener(`mousedown`, handleMousedownGreeting);
  handlerDispatcher(`succes`);
};

const getGreeting = (handlerDispatcher) => {
  const node = greeting.cloneNode(true);
  const nextBtn = node.querySelector(`.greeting__continue`);
  handleMousedownGreeting = onMouseDownGreeting(nextBtn, handlerDispatcher);
  nextBtn.addEventListener(`mousedown`, handleMousedownGreeting);
  return node;
};


export default getGreeting;


