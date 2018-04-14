const INITIAL_STATE = {
  lives: 3,
  time: 0
};

const gameStatistics = [];

const statsList = [`true`, `false`, `fast`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`];

const gamesContent = {
  gameOne: {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `paint`
      },
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`
      }
    ]
  },
  gameTwo: {
    title: `Угадай, фото или рисунок?`,
    images: [
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`
      }
    ]
  },

  gameThree: {
    title: `Найдите рисунок среди изображений`,
    images: [
      {
        figure: `https://k32.kn3.net/5C7060EC5.jpg`,
        type: `paint`
      },
      {
        photo: `https://i.imgur.com/DiHM5Zb.jpg`,
        type: `photo`
      },
      {
        photo: `http://i.imgur.com/DKR1HtB.jpg`,
        type: `photo`
      }
    ]
  }
};


export {INITIAL_STATE, gamesContent, statsList, gameStatistics};
