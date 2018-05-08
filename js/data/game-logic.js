const LENGTH_ARR_ANSWERS = 10;
const MIN_LIVES = 0;

const StatPoints = {
  CORRECT_ANSWER: 100,
  FAST_ANSWER: 50,
  SLOW_ANSWER: 50,
  LIVE: 50
};

const TimeAnswers = {
  FAST: 20,
  SLOW: 10
};

const countScore = (data, lives) => {
  if (lives < MIN_LIVES) {
    return false;
  }
  if (data.answers && data.answers.length !== LENGTH_ARR_ANSWERS) {
    return false;
  }
  let pointsAnswers = data.answers.reduce((previousValue, item) => {
    if (item) {
      previousValue += StatPoints.CORRECT_ANSWER;
    }
    return previousValue;
  }, 0);

  const pointTime = data.time.reduce((previousValue, item) => {
    if (item >= TimeAnswers.FAST) {
      previousValue += StatPoints.FAST_ANSWER;
    } else if (item < TimeAnswers.SLOW) {
      previousValue -= StatPoints.SLOW_ANSWER;
    }
    return previousValue;
  }, 0);

  const totalPoints = (lives * StatPoints.LIVE) + pointsAnswers + pointTime;

  return totalPoints;
};
export {countScore, StatPoints};
