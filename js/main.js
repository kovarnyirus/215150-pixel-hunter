const initialTemplate = document.querySelector(`.central`);
const SCREEN_TEMPLATES = document.querySelectorAll(`template`);
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
    if (numberTemplate < 5) {
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
