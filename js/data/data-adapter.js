const GameScreenTypes = {
  'ONE-OF-THREE': `GAME-3`,
  'TINDER-LIKE': `GAME-2`,
  'TWO-OF-TWO': `GAME-1`
};

const ImageTypes = {
  'PAINTING': `paint`,
  'PHOTO': `photo`
};


const adaptServerData = (data) => {
  return data.map((item) => {
    return {
      type: GameScreenTypes[item.type.toUpperCase()],
      question: item.question,
      images: item.answers.map(({url, width, height, type}) => {
        return {
          src: url,
          width: width,
          height: height,
          type: ImageTypes[type.toUpperCase()]
        };
      }),
      // images: item.answers.map((answer) => {
      //   return {
      //     src: answer.image.url,
      //     width: answer.image.width,
      //     height: answer.image.height,
      //     type: ImageTypes[answer.type.toUpperCase()]
      //   };
      // }),
    };
  });
};

export default adaptServerData;
