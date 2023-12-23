export const windowDisableScrolling = () => {
  const body = document.body;

  if (body) {
    body.style.overflow = "hidden";
  }
};

export const windowEnableScrolling = () => {
  const body = document.body;

  if (body) {
    body.style.overflow = "visible";
  }
};
