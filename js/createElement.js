const createElement = (template) => {
  const outer = document.createRange().createContextualFragment(template);
  return outer;
};

export default createElement;
