const contentContainer = document.querySelector(`.central`);

const renderScreen = (element) => {
  contentContainer.innerHTML = ``;
  contentContainer.appendChild(element);
};

const onLoadError = (errorMessage) => {
  const node = document.createElement(`div`);
  node.textContent = errorMessage;
  node.setAttribute(`class`, `error-message`);
  document.body.insertAdjacentElement(`afterbegin`, node);
  setTimeout(function () {
    const Message = document.querySelector(`.error-message`);
    document.body.removeChild(Message);
  }, 5000);
};


export {renderScreen, onLoadError};
