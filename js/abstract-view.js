import createElement from './createElement.js';
import FOOTER from './templates/footer.js';

export default class AbstractView {
  constructor(dispatch) {
    if (new.target === AbstractView) {
      throw new Error(`Нельзя создать AbstractView`);
    }
    this._footer = FOOTER;
    if (!dispatch) {
      throw new Error(`Не передан dispatch`);
    }
    this._dispatch = dispatch;

  }
  get template() {
    throw new Error(`Не найден подходящий шаблон`);
  }

  get element() {
    if (this._element) {
      return this._element;
    } else {
      this._element = this.render().cloneNode(true);
      this.bind(this._element);
      return this._element;
    }
  }

  render() {
    return createElement(this.template);
  }

  dispatch() {
    this._dispatch();
  }

  bind(element) {
  }
}
