const CONTENT_CONTAINER = document.querySelector(`.central`);

const renderScreen = (element) => {
  CONTENT_CONTAINER.innerHTML = ``;
  CONTENT_CONTAINER.appendChild(element);
};

const addHandler = (array, event, listtener) => {
  for (let item of array){
    item.addEventListener(event, listtener);
  }
};

const removeHandler = (array, event, listtener) => {
  for (let item of array){
    item.removeEventListener(event, listtener);
  }
};


export {renderScreen, addHandler, removeHandler};
