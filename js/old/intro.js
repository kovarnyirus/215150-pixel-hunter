import createElement from '../createElement.js';
import FOOTER from '../templates/footer.js';

const IS_GAME = false;
const html = `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
${FOOTER}`;

const intro = createElement(html);
let handleMousedownAsterisk;

const onMousedownAsterisk = (ASTERISK, dispatch) => () => {
  ASTERISK.removeEventListener(`mousedown`, handleMousedownAsterisk);
  dispatch({status: `succes`, isGame: IS_GAME});
};
const getIntro = (dispatch) => {
  const node = intro.cloneNode(true);
  const ASTERISK = node.querySelector(`.intro__asterisk`);
  handleMousedownAsterisk = onMousedownAsterisk(ASTERISK, dispatch);
  ASTERISK.addEventListener(`mousedown`, handleMousedownAsterisk);
  return node;
};


export default getIntro;
