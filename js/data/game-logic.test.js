import {assert} from 'chai';
import {countingPoints} from './game-logic.js';


const LIVES_ONE = 1;
const LIVES_TWO = 2;
const LIVES_THEE = 3;

const fillWith = (number, object) => {
  let arr = [];
  for (let i = 0; i <= number - 1; ++i) {
    arr.push(object);
  }
  return arr;
};

const answersLess = fillWith(9, {answer: true, time: 5});
const fastAnswers = fillWith(10, {answer: true, time: 5});
const slowAnswers = fillWith(10, {answer: true, time: 25});
const differentAnswers = fillWith(3, {answer: true, time: 5}).concat(
    fillWith(3, {answer: true, time: 15}),
    fillWith(3, {answer: true, time: 25}),
    fillWith(1, {answer: false, time: 25}));

describe(`Check points`, () => {
  it(`User answers less 10 questions`, () => {
    assert.equal(countingPoints(answersLess, LIVES_ONE), -1);
  });

  it(`10 fast true answers and 3 lives`, () => {
    assert.equal(countingPoints(fastAnswers, LIVES_THEE), 1650);
  });

  it(`10 slow true answers and 3 lives`, () => {
    assert.equal(countingPoints(slowAnswers, LIVES_ONE), 550);
  });

  it(`called with 3 fast, 3 normal, 4 slow and 1 incorrect answers and with 2 lives`, () => {
    assert.equal(countingPoints(differentAnswers, LIVES_TWO), 950);
  });
});
