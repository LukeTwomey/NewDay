import { FOCUSABLE_ELEMENTS } from "./Constants";

const useFocusTrap = (id) => {
  const modal = document.querySelector(id); // Select the modal by its id
  if (modal) {
    const firstFocusableElement = modal.querySelectorAll(FOCUSABLE_ELEMENTS)[0]; // Get first element to be focused
    const focusableContent = modal.querySelectorAll(FOCUSABLE_ELEMENTS);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // Get last element to be focused

    document.addEventListener("keydown", function (e) {
      let isTabPressed = e.key === "Tab" || e.keyCode === 9;

      if (!isTabPressed) {
        return; // Get out as soon as possible if tab has not been pressed
      }

      if (e.shiftKey) {
        // If shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // Focus on last focusable element
          e.preventDefault();
        }
      } else {
        // If tab key is pressed
        if (document.activeElement === lastFocusableElement) {
          // If focus has reached the last focusable element, then focus on first focusable element after pressing tab
          firstFocusableElement.focus(); // Focus on the first focusable element
          e.preventDefault();
        }
      }
    });
  }
};

export default useFocusTrap;
