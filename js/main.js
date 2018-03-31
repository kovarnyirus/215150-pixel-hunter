const INITIAL_TEMPLATE = document.querySelector(`.central`);
const SCREEN_TEMPLATES = document.querySelectorAll(`template`);
const TEMPLATES_ORDER = {
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

const sortTemplate = (sortArray, idArray) => {
  let afterSort = [];
  let arrays = Array.from(sortArray);
  arrays.forEach(function (value) {
    if (idArray[value.id]) {
      afterSort[idArray[value.id]] = value;
    } else {
      throw new Error(`порядковый номер такого шаблона ` + value.id + ` не найден`);
    }
  });
  return afterSort;
};

const SORT_ARR_TEMPLATE = sortTemplate(SCREEN_TEMPLATES, TEMPLATES_ORDER);

const showTemplate = (number) => {
  INITIAL_TEMPLATE.innerHTML = ``;
  INITIAL_TEMPLATE.appendChild(SORT_ARR_TEMPLATE[number].content.cloneNode(true));
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
