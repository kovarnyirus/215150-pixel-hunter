const POINTS_CORRECT_ANSWER = 100;
const POINTS_FAST_ANSWER = 50;
const POINTS_SLOW_ANSWER = 50;
const POINTS_LIVE = 50;
const TIME_FAST_ANSWER = 5;
const TIME_SLOW_ANSWER = 20;
const LENGTH_ARR_ANSWERS = 10;
const MIN_LIVES = 1;

const countScore = (data, lives) => {
  if (lives < MIN_LIVES) {
    return false;
  }
  if (data.answers.length !== LENGTH_ARR_ANSWERS) {
    return -1;
  }

  let pointsAnswers = data.answers.reduce((previousValue, item) => {
    return item ? previousValue += POINTS_CORRECT_ANSWER : previousValue;
  }, 0);

  let pointTime = data.time.reduce((previousValue, item) => {
    if (item <= TIME_FAST_ANSWER) {
      previousValue += POINTS_FAST_ANSWER;
    } else if (item.time > TIME_SLOW_ANSWER) {
      previousValue -= POINTS_SLOW_ANSWER;
    }
    return previousValue;
  }, 0);

  let totalPoints = (lives * POINTS_LIVE) + pointsAnswers + pointTime;

  return totalPoints;
};
export {countScore, POINTS_FAST_ANSWER, POINTS_CORRECT_ANSWER, POINTS_SLOW_ANSWER, POINTS_LIVE};
