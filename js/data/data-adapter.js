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
      images: item.answers.map(({type, image: {url, width, height}}) => ({
        src: url,
        width,
        height,
        type: ImageTypes[type.toUpperCase()]
      }))
    };
  });
};
export default adaptServerData;
