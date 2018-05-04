const CONTENT_CONTAINER = document.querySelector(`.central`);

const renderScreen = (element) => {
  CONTENT_CONTAINER.innerHTML = ``;
  CONTENT_CONTAINER.appendChild(element);
};

const addListners = (array, event, listtener) => {
  array.forEach((item) => {
    item.addEventListener(event, listtener);
  });
};

const removeListners = (array, event, listtener) => {
  array.forEach((item) => {
    item.removeEventListener(event, listtener);
  });
};


export {renderScreen, addListners, removeListners};
