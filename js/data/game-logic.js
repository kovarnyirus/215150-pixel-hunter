export const countScore = (answers, lives) => {
  const POINTS_CORRECT_ANSWER = 100;
  const POINTS_FAST_ANSWER = 50;
  const POINTS_SLOW_ANSWER = 50;
  const POINTS_LIVE = 50;
  const TIME_FAST_ANSWER = 5;
  const TIME_SLOW_ANSWER = 20;
  const LENGTH_ARR_ANSWERS = 10;
  const MIN_LIVES = 1;
  let totalPoints = 0;

  if (lives < MIN_LIVES) {
    return false;
  }
  if (answers.length !== LENGTH_ARR_ANSWERS) {
    return -1;
  }

  answers.forEach((item) => {
    if (item.answer) {
      totalPoints += POINTS_CORRECT_ANSWER;
    }
    if (item.time <= TIME_FAST_ANSWER) {
      totalPoints += POINTS_FAST_ANSWER;
    } else if (item.time > TIME_SLOW_ANSWER) {
      totalPoints -= POINTS_SLOW_ANSWER;
    }
  });

  totalPoints += lives * POINTS_LIVE;

  return totalPoints;
};
