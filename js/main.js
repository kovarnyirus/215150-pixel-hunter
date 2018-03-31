const CONTENT_CONTAINER = document.querySelector(`.central`);
const TEMPLATES_ORDERS = {
  'greeting': 1,
  'rules': 2,
  'game-1': 3,
  'game-2': 4,
  'game-3': 5,
  'stats': 6
};
const ARROW_LEFT_KEYCODE = 37;
const ARROW_RIGHT_KEYCODE = 39;
let templateNumber = 0;

const sortTemplate = (templates, indexes) => {
  let afterSort = [];
  Array.from(templates).forEach(function (value) {
    if (!indexes[value.id]) {
      if(!value.id){
        throw new Error(`не задан id у шаблона ` + value);
      }
      throw new Error(`порядковый номер шаблона ` + value.id + ` не найден`);
    }
    afterSort[indexes[value.id]] = value;
  });
  return afterSort;
};

const TEMPLATES = sortTemplate(document.querySelectorAll(`template`), TEMPLATES_ORDERS);

const showTemplate = (number) => {
  CONTENT_CONTAINER.innerHTML = ``;
  const TEMPLATE = TEMPLATES[number].content.cloneNode(true);
  CONTENT_CONTAINER.appendChild(TEMPLATE);
};

const onTemplateControl = (evt) => {
  if (evt.altKey && evt.keyCode === ARROW_RIGHT_KEYCODE) {
    if (templateNumber < 5) {
      ++templateNumber;
    }
    showTemplate(templateNumber);
  } else if (evt.altKey && evt.keyCode === ARROW_LEFT_KEYCODE) {
    if (templateNumber > 1) {
      --templateNumber;
    }
    showTemplate(templateNumber);
  }
};

document.addEventListener(`keydown`, onTemplateControl);
