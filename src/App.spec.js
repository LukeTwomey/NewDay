import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("should show 'Clear All Customer Debt' Button", () => {
    const { queryByText } = render(<App />);
    expect(queryByText(/Clear All Customer Debt/)).toBeInTheDocument();
  });

  it("should not initially be displaying the modal on screen", () => {
    const { queryByText } = render(<App />);
    expect(queryByText(/Confirm Delete/)).not.toBeInTheDocument();
  });

  it("should open modal when 'Clear All Customer Debt' Button has been pressed", () => {
    const { queryByText } = render(<App />);
    const button = screen.getByText("Clear All Customer Debt");
    fireEvent.click(button);
    expect(queryByText(/Confirm Delete/)).toBeInTheDocument();
  });

  describe("When modal is open", () => {
    beforeEach(() => {
      render(<App />);
      const button = screen.getByText("Clear All Customer Debt");
      fireEvent.click(button);
    });

    it("should place overlay over page content", () => {
      const overlay = document.getElementsByClassName("overlay");
      expect(overlay.length).toBe(1);
    });

    it("should prevent the page from being scrollable", () => {
      const body = document.body;
      expect(body.style.position).toBe("fixed");
    });

    it("should trap focus within the modal", async () => {
      const closeButton = document.getElementById("closeButton");
      const noButton = document.getElementById("noButton");
      const yesButton = document.getElementById("yesButton");

      // First focus on the close button
      closeButton.focus();
      expect(closeButton).toHaveFocus();

      // Tab and focus should move to `No` button
      await userEvent.tab();
      expect(noButton).toHaveFocus();

      // Tab and focus should move to `Yes` button
      await userEvent.tab();
      expect(yesButton).toHaveFocus();

      // Tab and focus should move back to the `Close` button as focus is trapped within modal
      await userEvent.tab();
      expect(closeButton).toHaveFocus();

      // Wanted to then do a shift+tab here to check focus goes back to the `Yes` button, but couldn't
      // immediately see how to shift+tab.  i.e. something like:
      // await userEvent.shiftTab();
      // expect(yesButton).toHaveFocus();
    });
  });
});
