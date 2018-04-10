import createElement from '../createElement.js';
import renderScreen from '../utils.js';
import getGreeting from './greeting.js';

const html = `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`;


const intro = createElement(html);
let handleMousedownAsterisk;

const onMousedownAsterisk = (ASTERISK) => () => {
  ASTERISK.removeEventListener(`mousedown`, handleMousedownAsterisk);
  renderScreen(getGreeting());
};
const getIntro = () => {
  const node = intro.cloneNode(true);
  const ASTERISK = node.querySelector(`.intro__asterisk`);
  handleMousedownAsterisk = onMousedownAsterisk(ASTERISK);
  ASTERISK.addEventListener(`mousedown`, handleMousedownAsterisk);
  return node;
};


export default getIntro;
