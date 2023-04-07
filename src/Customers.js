/* Ran out of time, but for this component I imagined using Context and creating a `Customer` component,
   making an api call to get a list of ten dummy people using my preferred data fetching method
   https://luketheweb.dev/blog/5-methods-to-fetch-data-in-react-with-performance-and-your-users-in-mind
   and looping over that to place a list of customers on the page, with a random `Balance` amount for each one. */

import styles from "./Customers.module.css";

const Customers = ({ setModalIsOpen }) => {
  const openModal = (e) => {
    setModalIsOpen(() => {
      // Trigger modal to show using passed down prop
      return {
        open: true,
        openingElement: e.target.id, // Retain the opening target id so focus can be returned when closed
      };
    });

    document.body.style.position = "fixed"; // Prevent scroll when modal is opened
  };

  return (
    <button
      onClick={(e) => openModal(e)}
      className={styles.button}
      id="clear-customer-debt-button"
    >
      Clear All Customer Debt
    </button>
  );
};

export default Customers;
