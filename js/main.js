import perl from './intro';

perl();

// const CONTENT_CONTAINER = document.querySelector(`.central`);
// const TEMPLATES_ORDERS = {
//   'greeting': 1,
//   'rules': 2,
//   'game-1': 3,
//   'game-2': 4,
//   'game-3': 5,
//   'stats': 6
// };
// const ARROW_LEFT_KEYCODE = 37;
// const ARROW_RIGHT_KEYCODE = 39;
// const TEMPLATES_MIN_INDEX = 0;
// let templateNumber = 0;
// const TEMPLATES_MAX_INDEX = Object.keys(TEMPLATES_ORDERS).length - 1;
//
// const sortTemplate = (templates, indexes) => {
//   let afterSort = [];
//   Array.from(templates).forEach(function (value) {
//     if (!value.id) {
//       throw new Error(`не задан id у шаблона ` + value);
//     } else if (!indexes[value.id]) {
//       throw new Error(`порядковый номер шаблона ` + value.id + ` не найден`);
//     }
//     afterSort[indexes[value.id] - 1] = value;
//   });
//   return afterSort;
// };
//
// const TEMPLATES = sortTemplate(document.querySelectorAll(`template`), TEMPLATES_ORDERS);
//
// const renderTemplate = (number) => {
//   CONTENT_CONTAINER.innerHTML = ``;
//   const TEMPLATE = TEMPLATES[number].content.cloneNode(true);
//   CONTENT_CONTAINER.appendChild(TEMPLATE);
// };
//
// const onTemplateKeyDown = (evt) => {
//   if (evt.altKey && evt.keyCode === ARROW_RIGHT_KEYCODE && templateNumber < TEMPLATES_MAX_INDEX) {
//     ++templateNumber;
//     renderTemplate(templateNumber);
//   } else if (evt.altKey && evt.keyCode === ARROW_LEFT_KEYCODE && templateNumber > TEMPLATES_MIN_INDEX) {
//     --templateNumber;
//     renderTemplate(templateNumber);
//   }
// };
//
// document.addEventListener(`keydown`, onTemplateKeyDown);
