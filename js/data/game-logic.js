const POINTS_CORRECT_ANSWER = 100;
const POINTS_FAST_ANSWER = 50;
const POINTS_SLOW_ANSWER = 50;
const POINTS_LIVE = 50;
const TIME_FAST_ANSWER = 20;
const TIME_SLOW_ANSWER = 10;
const LENGTH_ARR_ANSWERS = 10;
const MIN_LIVES = 0;

const countScore = (data, lives) => {
  if (lives < MIN_LIVES) {
    return false;
  }
  if (data.answers && data.answers.length !== LENGTH_ARR_ANSWERS) {
    return false;
  }
  let pointsAnswers = data.answers.reduce((previousValue, item) => {
    if (item) {
      previousValue += POINTS_CORRECT_ANSWER;
    }
    return previousValue;
  }, 0);

  const pointTime = data.time.reduce((previousValue, item) => {
    if (item >= TIME_FAST_ANSWER) {
      previousValue += POINTS_FAST_ANSWER;
    } else if (item < TIME_SLOW_ANSWER) {
      previousValue -= POINTS_SLOW_ANSWER;
    }
    return previousValue;
  }, 0);

  const totalPoints = (lives * POINTS_LIVE) + pointsAnswers + pointTime;

  return totalPoints;
};
export {countScore, POINTS_FAST_ANSWER, POINTS_CORRECT_ANSWER, POINTS_SLOW_ANSWER, POINTS_LIVE};
