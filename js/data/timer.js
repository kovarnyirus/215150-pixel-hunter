const timer = function (time) {
  if (typeof time !== `number`) {
    throw new Error(`time must be a number`);
  }

  if (time < 0) {
    throw new Error(`time cannot be negative`);
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
