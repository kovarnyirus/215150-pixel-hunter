import createElement from './createElement.js';
import FOOTER from './templates/footer.js';

export default class AbstractView {
  constructor(dispatch) {
    if (new.target === AbstractView) {
      throw new Error(`Нельзя создать AbstractView`);
    }
    if (!dispatch) {
      throw new Error(`Не передан dispatch`);
    }
    this.dispatch = this.dispatch.bind(this);
    this._footer = FOOTER;
    this._dispach = dispatch;
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

  dispatch(data) {
    return this._dispach(data);
  }

  bind(element) {
  }
};
