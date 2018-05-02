const CONTENT_CONTAINER = document.querySelector(`.central`);

const renderScreen = (element) => {
  CONTENT_CONTAINER.innerHTML = ``;
  CONTENT_CONTAINER.appendChild(element);
};

const addListners = (array, listtener) => {
  array.forEach((item) => {
    item.addEventListener(`mousedown`, listtener);
  });
};

const removeListners = (array, listtener) => {
  array.forEach((item) => {
    item.removeEventListener(`mousedown`, listtener);
  });
};


export {renderScreen, addListners, removeListners};
