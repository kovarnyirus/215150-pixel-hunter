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
let numberTemplate = 0;

function sortTemplate(template1, template2) {
console.log(template1)
};


const showTemplate = (numberTemplate) => {
  INITIAL_TEMPLATE.innerHTML = ``;
  INITIAL_TEMPLATE.appendChild(SCREEN_TEMPLATES[numberTemplate].content.cloneNode(true));
};

function onTemplateControl(event) {
  if (event.altKey && event.keyCode === ARROW_RIGHT_KEYCODE) {
    if (numberTemplate < 5) {
      ++numberTemplate;
    }
    showTemplate(numberTemplate);
  } else if (event.altKey && event.keyCode === ARROW_LEFT_KEYCODE) {
    if (numberTemplate > 0) {
      --numberTemplate;
    }
    showTemplate(numberTemplate);
  }
}

document.addEventListener(`keydown`, onTemplateControl);
console.log(SCREEN_TEMPLATES);
