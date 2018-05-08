const timer = function (time) {
  if (typeof time !== `number`) {
    throw new Error(`Значение не числового типа`);
  }

  if (time < 0) {
    throw new Error(`Время не может быть отрицательным`);
  }

  return {
    value: time,
    tick() {
      if (time > 0) {
        this.value--;
      } else if (time === 0) {
        return `Время вышло`;
      }
      return this.value;
    }
  };
};

export default timer;
