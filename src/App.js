import { useState } from "react";
import Customers from "./Customers";
import Modal from "./Modal";
import "./styles.css";

export default function App() {
  /* Need a flag to keep track of whether the modal is open (so should be displayed or not), and 
     the element that triggered it to open, so focus can be returned to it when the modal is closed */
  const [modalIsOpen, setModalIsOpen] = useState({
    open: false,
    openingElement: null,
  });

  return (
    <>
      {/* Passing down the ability to open the modal to Customers component } */}
      <Customers setModalIsOpen={setModalIsOpen} />{" "}
      <Modal
        isOpen={modalIsOpen.open} // Allows the modal keep track of whether it should be shown or hidden
        openingElement={modalIsOpen.openingElement} // Allows it to return focus to the element that first triggered it
        setModalIsOpen={setModalIsOpen} // Allows it to close itself when the user quits the modal via ESC or other means
        label="Confirm Delete" // Passing the modal contents in via props makes the modal reusable
        description="Are you sure you want to write off all of your customer's debt?"
        /* Can further improve by adding something like `type=confirmation` or `type=alert` and then have logic within the modal
           to determine which buttons are displayed i.e. Yes/No or OK etc */
      />
    </>
  );
}
