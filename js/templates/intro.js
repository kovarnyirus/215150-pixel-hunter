import createElement from '../createElement.js';
import renderScreen from '../utils.js';
import getGreeting from './greeting.js';
import FOOTER from './footer.js';


const htmlAll = html + FOOTER;

const intro = createElement(htmlAll);
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
