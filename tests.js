/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */
document.addEventListener("change", () => {
  const elems = document.querySelectorAll("select, input");
  for (let i = 0, e; e = elems[i]; i++) {
    if (!e.id) console.warn("e has no ID: ", e);
  }
});
