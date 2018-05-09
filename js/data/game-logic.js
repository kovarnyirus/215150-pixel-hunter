const LENGTH_ARR_ANSWERS = 10;
const MIN_LIVES = 0;

const StatPoints = {
  CORRECT_ANSWER: 100,
  FAST_ANSWER: 50,
  SLOW_ANSWER: 50,
  LIVE: 50
};

const AnswerDurations = {
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
  const answersPoints = data.answers.reduce((previousValue, item) => {
    if (item) {
      previousValue += StatPoints.CORRECT_ANSWER;
    }
    return previousValue;
  }, 0);

  const answersDurationPoints = data.time.reduce((previousValue, item) => {
    if (item >= AnswerDurations.FAST) {
      previousValue += StatPoints.FAST_ANSWER;
    } else if (item < AnswerDurations.SLOW) {
      previousValue -= StatPoints.SLOW_ANSWER;
    }
    return previousValue;
  }, 0);

  return (lives * StatPoints.LIVE) + answersPoints + answersDurationPoints;
};
export {countScore, StatPoints, AnswerDurations};
