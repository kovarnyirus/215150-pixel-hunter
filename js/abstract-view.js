import createElement from './createElement.js';

export default class AbstractView {
  constructor () {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }
  get template() {
    throw new Error(`Не найден подходящий шаблон`);
  }

  get element() {
    if (this._element) {
      return this._element;
    } else {
      this._element = this.createElem();
      this._node = this.element.cloneNode(true);
      this.bind(this._node);
      return this._node;
    }
  }

  createElem() {
    return createElement(this.template);
  }

  bind(element) {
  }

  footer() {
    return ` <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>`
  }
};
