import {assert} from 'chai';
import {countScore} from './game-logic.js';


const LIVES_ONE = 1;
const LIVES_TWO = 2;
const LIVES_THEE = 3;

const fillWith = (cnt, item) => (new Array(cnt).fill(item));

const answersLess = fillWith(9, {answer: true, time: 5});
const fastAnswers = fillWith(10, {answer: true, time: 5});
const slowAnswers = fillWith(10, {answer: true, time: 25});
const normalAnswers = fillWith(10, {answer: true, time: 15});
const differentAnswers = [
  ...fillWith(3, {answer: true, time: 5}),
  ...fillWith(3, {answer: true, time: 15}),
  ...fillWith(3, {answer: true, time: 25}),
  ...fillWith(1, {answer: false, time: 25})
];


describe(`Check points`, () => {
  it(`User answers less 10 questions`, () => {
    assert.equal(countScore(answersLess, LIVES_ONE), -1);
  });

  it(`10 fast true answers and 3 lives`, () => {
    assert.equal(countScore(fastAnswers, LIVES_THEE), 1650);
  });

  it(`10 slow true answers and 3 lives`, () => {
    assert.equal(countScore(slowAnswers, LIVES_ONE), 550);
  });

  it(`called with 3 fast, 3 normal, 4 slow and 1 incorrect answers and with 2 lives`, () => {
    assert.equal(countScore(differentAnswers, LIVES_TWO), 950);
  });

  it(`user passed the test all right with average speed and 3 lives`, () => {
    assert.equal(countScore(normalAnswers, LIVES_THEE), 1150);
  });
});
