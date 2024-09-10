export const disableScroll = (isDisabled: boolean) => {
  try {
    const body = document.body;

    if (body) {
      if (isDisabled) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }
  } catch (error) {
    console.error("Error in disableScroll", error);
  }
};
