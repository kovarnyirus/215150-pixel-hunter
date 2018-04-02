const CONTENT_CONTAINER = document.querySelector(`.central`);

export const renderScreen = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};
