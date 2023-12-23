export const windowDisableScrolling = () => {
  const body = document.body;

  if (body) {
    body.style.overflow = "hidden";
    body.style.paddingRight = "8px";
  }
};

export const windowEnableScrolling = () => {
  const body = document.body;

  if (body) {
    body.style.overflow = "visible";
    body.style.paddingRight = "0";
  }
};
