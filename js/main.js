// const initialTemplate = document.querySelector(`.central`).innerHTML;
const SCREEN_TEMPLATES = [
  document.querySelector(`.central`),
  document.querySelector(`#greeting`).innerHTML,
  document.querySelector(`#rules`).innerHTML,
  document.querySelector(`#game-1`).innerHTML,
  document.querySelector(`#game-2`).innerHTML,
  document.querySelector(`#game-3`).innerHTML,
  document.querySelector(`#stats`).innerHTML
];
const AltKeyCode = 18;
const ArrowLeftKeyCode = 37;
const ArrowRightKeyCode = 39;
let numberTemplate = 0;
let codes = null;

function showTemplate(numberTemplate) {
  let initialTemplate = SCREEN_TEMPLATES [0].cloneNode(true);
  while (initialTemplate.firstChild) {
    initialTemplate.removeChild(initialTemplate.firstChild);
  }
  initialTemplate.appendChild(SCREEN_TEMPLATES[numberTemplate]);
}

function onTemplateControl(event) {
  let pressed = {};

  if (codes === AltKeyCode && event.keyCode === ArrowRightKeyCode) {
    ++numberTemplate;
    if (numberTemplate  >= 6) {
      numberTemplate = 6;
    }
    showTemplate(numberTemplate);
  } else if (codes === AltKeyCode && event.keyCode === ArrowLeftKeyCode) {
    --numberTemplate;
    if (numberTemplate < 0) {
      numberTemplate = 0;
    }
    showTemplate(numberTemplate);
  }
  codes = event.keyCode;
  console.log(numberTemplate);
}


document.addEventListener(`keydown`, onTemplateControl);
