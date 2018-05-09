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
  return data.map((item) => {S
    return {
      type: GameScreenTypes[item.type.toUpperCase()],
      question: item.question,
      images: item.answers.map(({ image: { url, width, height}}, index) => ({
          src: url,
          width,
          height,
          type: ImageTypes[item.answers[index].type.toUpperCase()]
      }))
    };
  });
};

export default adaptServerData;
