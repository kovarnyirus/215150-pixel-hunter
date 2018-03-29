const initialTemplate = document.querySelector(`.central`);
const SCREEN_TEMPLATES = [
  document.querySelector(`#greeting`),
  document.querySelector(`#rules`),
  document.querySelector(`#game-1`),
  document.querySelector(`#game-2`),
  document.querySelector(`#game-3`),
  document.querySelector(`#stats`)
];
const AltKeyCode = 18;
const ArrowLeftKeyCode = 37;
const ArrowRightKeyCode = 39;
let codes = null;
let numberTemplate = 0;

const showTemplate = (numberTemplate) => {
  initialTemplate.innerHTML = ``;
  initialTemplate.appendChild(SCREEN_TEMPLATES[numberTemplate].content.cloneNode(true));
};

function onTemplateControl(event) {
  if (codes === AltKeyCode && event.keyCode === ArrowRightKeyCode) {
    if (numberTemplate <= 6) {
      ++numberTemplate;
    }
    showTemplate(numberTemplate);
  } else if (codes === AltKeyCode && event.keyCode === ArrowLeftKeyCode) {
    if (numberTemplate > 0) {
      --numberTemplate;
    }
    showTemplate(numberTemplate);
  }
  codes = event.keyCode;
}

document.addEventListener(`keydown`, onTemplateControl);
