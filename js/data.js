const INITIAL_STATE = {
  lives: 3,
  time: 0
};

const gameStatistics = [
  {
    answer: 0,
    lives: 0,
    time: 0
  }
];

const statsList = [`true`, `false`, `fast`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`];

const gamesContent = {
  gameOne: {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      {
        figure: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        photo: `http://i.imgur.com/1KegWPz.jpg`
      }
    ]
  },
  gameTwo: {
    title: `Угадай, фото или рисунок?`,
    images: [
      {
        figure: `https://k42.kn3.net/D2F0370D6.jpg`
      }
    ]
  },

  gameThree: {
    title: `Найдите рисунок среди изображений`,
    images: [
      {
        figure: `https://k32.kn3.net/5C7060EC5.jpg`
      },
      {
        photo: `https://i.imgur.com/DiHM5Zb.jpg`
      },
      {
        photo: `http://i.imgur.com/DKR1HtB.jpg`
      }
    ]
  }
};


export {INITIAL_STATE, gamesContent, statsList};
