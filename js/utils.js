const CONTENT_CONTAINER = document.querySelector(`.central`);

const renderScreen = (element) => {
  CONTENT_CONTAINER.innerHTML = ``;
  CONTENT_CONTAINER.appendChild(element);
};

const addHandler = (array, event, listtener) => {
  array.forEach((item) => {
    item.addEventListener(event, listtener);
  });
};

const removeHandler = (array, event, listtener) => {
  array.forEach((item) => {
    item.removeEventListener(event, listtener);
  });
};


export {renderScreen, addHandler, removeHandler};
