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
  </div>
${FOOTER}`;

const greeting = createElement(html);
let handleMousedownGreeting;

const onMouseDownGreeting = (nextBtn, dispatch) => () => {
  nextBtn.removeEventListener(`mousedown`, handleMousedownGreeting);
  dispatch({status:`succes`, isGame: IS_GAME});
};

const getGreeting = (dispatch) => {
  const node = greeting.cloneNode(true);
  const nextBtn = node.querySelector(`.greeting__continue`);
  handleMousedownGreeting = onMouseDownGreeting(nextBtn, dispatch);
  nextBtn.addEventListener(`mousedown`, handleMousedownGreeting);
  return node;
};


export default getGreeting;


