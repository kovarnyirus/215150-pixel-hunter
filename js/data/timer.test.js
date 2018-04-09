import {assert} from 'chai';
import {timer} from './timer';


describe(`Check timer`, () => {
  it(`time not a number`, () => {
    assert.throw(() => timer(`asd`), Error);
  });

  it(`time cannot be negative`, () => {
    assert.throw(() => timer(-5), Error);
  });

  it(`checking the time value`, () => {
    assert.equal(timer(30).value, 30);
  });

  it(`checking the tic method`, () => {
    const time = 20;
    assert.equal(timer(time).tick(), 19);
  });

  it(`checking the tic method if time = 0`, () => {
    const time = 0;
    assert.equal(timer(time).tick(), `Время вышло`);
  });

});

