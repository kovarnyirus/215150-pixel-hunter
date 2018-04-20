import AbstractView from '../../abstract-view.js';

class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
       </div>
    </div>`;
  }

  bind(dispatch){
    const node = this.element.cloneNode(true);
    const ASTERISK = node.querySelector(`.intro__asterisk`);
    const handleMousedownAsterisk = onMousedownAsterisk(ASTERISK, dispatch);
    ASTERISK.addEventListener(`mousedown`, handleMousedownAsterisk);
    return node;
  }

}
