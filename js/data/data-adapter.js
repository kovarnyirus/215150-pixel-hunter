const typeGameScreens = {
  'one-of-three': `game-3`,
  'tinder-like': `game-2`,
  'two-of-two': `game-1`
};

const typeImage = {
  'painting': `paint`,
  'photo': `photo`
};


const adaptServerData = (data) => {
  console.log(data);
  return data.map((item) => {
    return {
      type: typeGameScreens[item.type],
      question: item.question,
      images: item.answers.map((answer) => {
        return {
          src: answer.image.url,
          width: answer.image.width,
          height: answer.image.height,
          type: typeImage[answer.type]
        };
      }),
    };
  });
};

export default adaptServerData;
