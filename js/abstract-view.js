import createElement from '../createElement.js';

class AbstractView {
  constructor() {
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
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }
  }

  render() {
    return createElement(this.template);
  }

  bind() {
  }
}

export default AbstractView;
