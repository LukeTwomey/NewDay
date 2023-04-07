/* Ran out of time, file need refactoring and some parts broken out into other components
   as I'm not happy with the length and complexity */

import { useEffect } from "react";
import useFocusTrap from "./useFocusTrap"; // Custom hook for focus trapping functionality
import useHandleEscape from "./useHandleEscape"; // Custom hook to handle escape key being pressed
import styles from "./Modal.module.css";

const Modal = ({
  isOpen,
  openingElement,
  setModalIsOpen,
  label,
  description,
}) => {
  const closeModal = () => {
    document.getElementById(openingElement).focus(); // Return focus to the opening element

    setModalIsOpen(() => {
      return {
        open: false,
        openingElement: null, // Reset the opening element now we have closed the modal, ready for next use
      };
    });

    // Wanted to refactor the no scroll stuff below to move it elsewhere and reduce the noise here
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = "";
    body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  };

  // When component loads trap focus inside the modal and handle escape key using the custom hooks
  useEffect(() => {
    useFocusTrap("#alertdialog");
    useHandleEscape(setModalIsOpen);
  });

  /* Below needs refactoring as it is too long. Would like to break out the smaller components like the close
     button, confirmation buttons etc. Also then benefit from keeping the styling for those contained */
  return (
    isOpen && (
      <div className={styles.overlay}>
        <div
          id="alertdialog"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="dialog_label"
          aria-describedby="dialog_desc"
        >
          <button
            type="button"
            id="closeButton"
            aria-label="Close"
            className={styles.close}
            onClick={() => closeModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </button>

          <h2 className={styles.label}>{label}</h2>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              id="noButton"
              className={styles.cancel}
              onClick={() => closeModal()}
            >
              No
            </button>
            <button
              type="button"
              id="yesButton"
              className={styles.confirm}
              onClick={() => closeModal()} // Here would have gone off to also clear the `Balances` for each of the customers
              // rather than just closing the modal as at the moment the functionality is exactly the same as the No button
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
