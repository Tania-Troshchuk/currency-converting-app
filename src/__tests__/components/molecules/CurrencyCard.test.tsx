import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CurrencyCard } from "../../../components";
import userEvent from "@testing-library/user-event";

describe("CurrencyCard Component", () => {
  const user = userEvent.setup();
  const mockSelectList = ["Option 1", "Option 2", "Option 3"];
  const mockHandleInput = jest.fn();
  const mockHandleSelect = jest.fn();

  it("renders correctly only with required props", () => {
    render(
      <CurrencyCard
        inputTitle="Test input title"
        handleInput={mockHandleInput}
        selectList={mockSelectList}
        handleSelect={mockHandleSelect}
      />
    );

    const cardElement = screen.getByTestId("currency-card");
    const inputElement = screen.getByLabelText("Test input title");
    const selectElement = screen.getByTestId("custom-select");

    expect(cardElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("0");
    expect(selectElement).toBeInTheDocument();
  });

  it("renders correctly with optional props", () => {
    render(
      <CurrencyCard
        inputTitle="Test input title"
        handleInput={mockHandleInput}
        selectList={mockSelectList}
        handleSelect={mockHandleSelect}
        inputValue="123"
        selectedItem={mockSelectList[0]}
        className="test-class"
      />
    );

    const cardElement = screen.getByTestId("currency-card");
    const inputElement = screen.getByLabelText("Test input title");
    const selectElement = screen.getByTestId("custom-select");
    const selectTitle = screen.getByTestId("custom-select-title");

    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveClass("test-class");
    expect(inputElement).toHaveValue("123");
    expect(selectElement).toBeInTheDocument();
    expect(selectTitle).toHaveTextContent(mockSelectList[0]);
  });

  it("correctly passes handleInput and handleSelect functions", async () => {
    render(
      <CurrencyCard
        inputTitle="Test input title"
        handleInput={mockHandleInput}
        selectList={mockSelectList}
        handleSelect={mockHandleSelect}
        inputValue="1"
      />
    );

    const inputElement = screen.getByLabelText("Test input title");
    const select = screen.getByTestId("custom-select");

    await user.type(inputElement, "2");
    expect(mockHandleInput).toHaveBeenCalledWith("12");

    await user.click(select);
    await user.click(screen.getByText(mockSelectList[1]));

    expect(mockHandleSelect).toHaveBeenCalledWith(mockSelectList[1]);
  });
});
