export const countingPoints = (answers, lives) => {
  const pointsCorrectAnswer = 100;
  const pointsFastAnswer = 50;
  const pointsSlowAnswer = 50;
  const pointsLive = 50;
  const timeFastAnswer = 5;
  const timeSlowAnswer = 20;
  let totalPoints = 0;

  if (lives <= 0) {
    return false;
  }
  if (answers.length !== 10) {
    return -1;
  }

  answers.forEach((item) => {
    if (item.answer) {
      totalPoints += pointsCorrectAnswer;
    }
    if (item.time <= timeFastAnswer) {
      totalPoints += pointsFastAnswer;
    } else if (item.time > timeSlowAnswer) {
      totalPoints -= pointsSlowAnswer;
    }
  });

  totalPoints += lives * pointsLive;

  return totalPoints;
};
