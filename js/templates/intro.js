import createElement from '../createElement.js';
import renderScreen from '../utils.js';
import getGreeting from './greeting.js';

const html = `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`;

const footerTemplate = ` <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>`;


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
