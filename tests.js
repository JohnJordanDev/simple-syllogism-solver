/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */
const check = (elemString) => () => {
  const elems = document.querySelectorAll(elemString);
  for (let i = 0, e; e = elems[i]; i++) {
    if (!e.id) console.warn("e has no ID: ", e);
  }
};
document.addEventListener("change", check("input, select"));

document.addEventListener("click", check("a, button, [data-event]"));
