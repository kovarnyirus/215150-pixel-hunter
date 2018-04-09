import {assert} from 'chai';
import {countingPoints} from './game-logic.js';


const LIVES_ONE = 1;
const LIVES_TWO = 2;
const LIVES_THEE = 3;

const answersLess = (new Array(9)).fill({answer: true, time: 5});
const fastAnswers = (new Array(10)).fill({answer: true, time: 5});
const slowAnswers = (new Array(10)).fill({answer: true, time: 25});

//
// const differentAnswers = [
//   {answer: true, time: 5},
//   {answer: true, time: 5},
//   {answer: true, time: 5},
//   {answer: true, time: 10},
//   {answer: true, time: 10},
//   {answer: true, time: 10},
//   {answer: true, time: 25},
//   {answer: true, time: 25},
//   {answer: true, time: 25},
//   {answer: false, time: 25}
// ];
//
const differentAnswers = (new Array(10)).map((item, i) => {
  if (i <= 3) {
    item = {answer: true, time: 5};
  } else if (i <= 6) {
    item = {answer: true, time: 15};
  } else if (i <= 9) {
    item = {answer: true, time: 25};
  } else if (i <= 10) {
    item = {answer: false, time: 25};
  }
});

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
