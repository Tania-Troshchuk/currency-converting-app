import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Note } from "../../../components";

test("Note Component renders correctly", () => {
  render(
    <Note
      baseCurrency="USD"
      quoteCurrency="EUR"
      quoteRate="0.1230"
      date="2023-11-17"
    />
  );

  const noteElement = screen.getByTestId('note')

  expect(noteElement).toHaveTextContent(/1 USD = 0.1230 EUR/);
  expect(noteElement).toHaveTextContent(
    /The market exchange rate on 2023-11-17/
  );
});
