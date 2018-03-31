const INITIAL_TEMPLATE = document.querySelector(`.central`);
const SCREEN_TEMPLATES = document.querySelectorAll(`template`);
const ORDER_TEMPLATES = {
  'greeting': 1,
  'rules': 2,
  'game-1': 3,
  'game-2': 4,
  'game-3': 5,
  'stats': 6
};
const ARROW_LEFT_KEYCODE = 37;
const ARROW_RIGHT_KEYCODE = 39;
const SORT_ARR_TEMPLATE = sortTemplate(SCREEN_TEMPLATES, ORDER_TEMPLATES);
let numberTemplate = 0;


function sortTemplate(sorrtArray, idArray) {
  let arrays = [...sorrtArray];
  let afterSort = [];
  arrays.forEach(function (value) {
    for (key in idArray) {
      if (key === value.id) {
        afterSort[idArray[key]] = value;
      }
    }
  });
  return afterSort;
}

const showTemplate = (number) => {
  INITIAL_TEMPLATE.innerHTML = ``;
  INITIAL_TEMPLATE.appendChild(SORT_ARR_TEMPLATE[number].content.cloneNode(true));
};

function onTemplateControl(event) {
  if (event.altKey && event.keyCode === ARROW_RIGHT_KEYCODE) {
    if (numberTemplate < 5) {
      ++numberTemplate;
    }
    showTemplate(numberTemplate);
  } else if (event.altKey && event.keyCode === ARROW_LEFT_KEYCODE) {
    if (numberTemplate > 1) {
      --numberTemplate;
    }
    showTemplate(numberTemplate);
  }
}

document.addEventListener(`keydown`, onTemplateControl);
