const INITIAL_STATE = {
  lives: 3,
  time: 0
};

const gameStatistics = [
  {lives: 0, time: 0},
];
const gamesContent = [
  {
    gameNumber: `one`,
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
  {
    gameNumber: `two`,
    title: `Угадай, фото или рисунок?`,
    images: [
      {
        figure: `https://k42.kn3.net/D2F0370D6.jpg`
      },
    ]
  },
  {
    gameNumber: `three`,
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
  },
  {
    gameNumber: `four`,
    title: `игра 4`,
    images: [
      {
        figure: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        photo: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]

  },
  {
    gameNumber: `five`,
    title: `Игра 5`,
    images: [
      {
        figure: `https://k42.kn3.net/D2F0370D6.jpg`
      },
    ]
  },
  {
    gameNumber: `six`,
    title: `Игра 6`,
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
  },
  {
    gameNumber: `seven`,
    title: `игра 7`,
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
  },
  {
    gameNumber: `eight`,
    title: `игра 8`,
    images: [
      {
        figure: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        photo: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]

  },
  {
    gameNumber: `nine`,
    title: `Игра 9`,
    images: [
      {
        figure: `https://k42.kn3.net/D2F0370D6.jpg`
      },
    ]
  },
  {
    gameNumber: `ten`,
    title: `Игра 10`,
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
];

const screens = {
  'intro': {
    content: `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`
  }
};

export {INITIAL_STATE, screens, gamesContent};
