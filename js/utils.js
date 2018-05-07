const CONTENT_CONTAINER = document.querySelector(`.central`);

const renderScreen = (element) => {
  CONTENT_CONTAINER.innerHTML = ``;
  CONTENT_CONTAINER.appendChild(element);
};

const addHandler = (array, event, listtener) => {
  for (let item of array) {
    item.addEventListener(event, listtener);
  }
};

const removeHandler = (array, event, listtener) => {
  for (let item of array) {
    item.removeEventListener(event, listtener);
  }
};

const onLoadError = (errorMessage) => {
  const node = document.createElement('div');
  node.style.border = '1px solid';
  node.style.textAlign = 'center';
  node.style.width = '40%';
  node.style.padding = '20';
  node.style.zIndex = '100';
  node.style.position = 'fixed';
  node.style.color = '#3a000b';
  node.style.background = '#cccccc';
  node.style.fontSize = '26px';
  node.textContent = errorMessage;
  node.setAttribute('class', 'error-message');
  document.body.insertAdjacentElement('afterbegin', node);
  setTimeout(function () {
    const Message = document.querySelector('.error-message');
    document.body.removeChild(Message);
  }, 5000);
}


export {renderScreen, addHandler, removeHandler, onLoadError};
