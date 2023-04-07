import { KEY_CODE } from "./Constants";

const useHandleEscape = (setModalIsOpen) => {
  const closeModal = () => {
    /* TODO - Ran out of time but also wanted a line like below which would return focus in the same way as if you'd
       clicked the close button or action buttons. When it tried to find the openingElement it was initially null so crashed the app, 
       so some kind of race condition or re-rendering issue where this value was not available when this line executed. Needed to
       investigate further */
    //  document.getElementById(openingElement).focus();
    setModalIsOpen(() => {
      return {
        open: false,
        openingElement: null,
      };
    });

    // Again, wanted to refactor this out as I have repetition here with the same no scroll code in Modal.js file
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = "";
    body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  };

  const handleEscape = (e) => {
    if (e) {
      const key = e.which || e.keyCode;

      if (key === KEY_CODE.ESC) {
        closeModal();
        e.stopPropagation();
      }
    }
  };

  document.addEventListener("keyup", (e) => handleEscape(e));
};

export default useHandleEscape;
