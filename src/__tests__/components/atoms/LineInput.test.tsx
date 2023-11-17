import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LineInput } from "../../../components";

describe("LineInput Component", () => {
  const mockHandleInput = jest.fn();
  const user = userEvent.setup();

  it("renders correctly", () => {
    render(
      <LineInput
        value="0"
        title="Test Input"
        handleInput={mockHandleInput}
        placeholder="Test placeholder"
      />
    );

    const inputElement = screen.getByLabelText("Test Input");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("0");
    expect(inputElement).toHaveAttribute("autoComplete", "off");
    expect(inputElement).toHaveAttribute("placeholder", "Test placeholder");
  });

  it("calls handleInput function with numbers and decimals numbers", async () => {
    render(
      <LineInput value="0" title="Test Input" handleInput={mockHandleInput} />
    );

    const inputElement = screen.getByLabelText("Test Input");

    mockHandleInput.mockClear();
    await user.type(inputElement, "123456789");

    expect(mockHandleInput.mock.calls).toStrictEqual([
      ["01"],
      ["02"],
      ["03"],
      ["04"],
      ["05"],
      ["06"],
      ["07"],
      ["08"],
      ["09"],
    ]);

    mockHandleInput.mockClear();
    await user.type(inputElement, ".100");

    expect(mockHandleInput.mock.calls).toStrictEqual([
      ["0."],
      ["01"],
      ["0"],
      ["0"],
    ]);
  });

  it("does not allow characters other than numbers and decimals numbers in the input field", async () => {
    render(
      <LineInput value="0" title="Test Input" handleInput={mockHandleInput} />
    );

    const inputElement = screen.getByLabelText("Test Input");

    await user.type(inputElement, "0000");
    expect(mockHandleInput).toHaveBeenCalledWith("0");

    await user.type(inputElement, "..");
    expect(mockHandleInput).toHaveBeenCalledWith("0.");

    await user.type(inputElement, "abc");
    expect(mockHandleInput).toHaveBeenCalledWith("0");

    await user.type(inputElement, "~`!@#$%^&*()_+|:;',/<>?{{[[]]}}");
    expect(mockHandleInput).toHaveBeenCalledWith("0");
  });
});
