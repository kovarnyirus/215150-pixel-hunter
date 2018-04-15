const INITIAL_STATE = {
  lives: 3,
  time: 0
};


const state = {
  stats: [], // будет зполняться по мере игры
  lives: 3, // будет зполняться по мере игры
  answers: [], // будет зполняться по мере игры
  levels: [
    {
      type: `game-1`,
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
    {
      type: `game-2`,
      title: `Угадай, фото или рисунок?`,
      images: [
        {
          src: `https://k42.kn3.net/D2F0370D6.jpg`,
          type: `paint`
        }
      ]
    },
    {
      type: `game-3`,
      title: `Найдите рисунок среди изображений`,
      images: [
        {
          src: `https://k32.kn3.net/5C7060EC5.jpg`,
          type: `paint`
        },
        {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          type: `photo`
        },
        {
          src: `http://i.imgur.com/DKR1HtB.jpg`,
          type: `photo`
        }
      ]
    }
  ],
  time: []
};


export {INITIAL_STATE, state};
