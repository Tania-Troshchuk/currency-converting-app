import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RatesTable } from "../../../components";
import { IRateTable } from "../../../types/converter";

const mockRates: IRateTable[] = [
  { currency: "USD", oneUnit: "1.2", amount: "120" },
  { currency: "EUR", oneUnit: "0.8", amount: "80" },
];
const cells = ["Currency:", "1 Unit:", "Amount:", "USD", "1.2", "120"];

test("RatesTable Component renders correctly content", () => {
  const { container } = render(<RatesTable list={mockRates} />);

  const ratesTableElement = container.firstElementChild;

  expect(ratesTableElement?.firstElementChild).toHaveClass("rates-grid");
  expect(ratesTableElement?.lastElementChild).toHaveClass("rates-grid");

  cells.forEach((cell) => {
    expect(screen.getByText(cell)).toHaveClass("cell");
  });
});
