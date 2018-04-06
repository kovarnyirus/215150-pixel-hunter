const createElement = (template) => {
  return document.createRange().createContextualFragment(template);
};

export default createElement;
