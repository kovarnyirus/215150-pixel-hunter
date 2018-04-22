import createElement from './createElement.js';
import FOOTER from './templates/footer.js';

export default class AbstractView {
  constructor(dispatch) {
    if (new.target === AbstractView) {
      throw new Error(`Нельзя создать AbstractView`);
    }
    this._footer = FOOTER;
    this._dispatch = dispatch;
  }
  get template() {
    throw new Error(`Не найден подходящий шаблон`);
  }

  get element() {
    if (this._element) {
      return this._element;
    } else {
      this._element = this.render();
      this._node = this._element.cloneNode(true);
      this.bind(this._node);
      return this._node;
    }
  }

  render() {
    return createElement(this.template);
  }

  bind(element) {
  }
}
