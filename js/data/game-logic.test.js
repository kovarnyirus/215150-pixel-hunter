import {assert} from 'chai';
import {countingPoints} from './game-logic.js';
import {answersLess, fastAnswers, slowAnswers, differentAnswers} from './data.js';

const LIVES_ONE = 1;
const LIVES_TWO = 2;
const LIVES_THEE = 3;


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
