import abstractView from '../../abstract-view.js';
import IntroView from './intro-view';
import dispatch from '../../dispatcher';

const introScreen = () => {
  const intro = new IntroView();
  intro.onMousedownAsterisk(ASTERISK, dispatch) => () => {
    ASTERISK.removeEventListener(`mousedown`, handleMousedownAsterisk);
    dispatch({status: `succes`, isGame: IS_GAME});
  };
  return intro;
};

export default introScreen;
