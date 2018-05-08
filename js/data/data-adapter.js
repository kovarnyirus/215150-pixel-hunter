const GameScreenTypes = {
  'ONE-OF-THREE': `GAME-3`,
  'TINDER-LIKE': `GAME-2`,
  'TWO-OF-TWO': `GAME-1`
};

const TypeImage = {
  'PAINTING': `paint`,
  'PHOTO': `photo`
};


const adaptServerData = (data) => {
  return data.map((item) => {
    return {
      type: GameScreenTypes[item.type.toUpperCase()],
      question: item.question,
      images: item.answers.map((answer) => {
        return {
          src: answer.image.url,
          width: answer.image.width,
          height: answer.image.height,
          type: TypeImage[answer.type.toUpperCase()]
        };
      }),
    };
  });
};

export default adaptServerData;
