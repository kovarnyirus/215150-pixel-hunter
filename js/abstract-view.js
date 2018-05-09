import createElement from './create-element.js';
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
    // if (!this._element) {
    //   this._element = this.render();
    // }
    // const element = this._element.cloneNode(true);
    // this.bind(element);
    // return element;
  }

  get timer() {
    return this.element.querySelector(`.game__timer`);
  }

  render() {
    return createElement(this.template);
  }

  dispatch(data) {
    return this._dispach(data);
  }

  bind() {
  }
}
