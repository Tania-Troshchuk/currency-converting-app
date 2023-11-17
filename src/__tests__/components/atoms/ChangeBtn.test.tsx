import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChangeBtn } from "../../../components";

describe("ChangeBtn", () => {
  const mockOnClick = jest.fn();
  const user = userEvent.setup();

  it("renders correctly without props", () => {
    render(<ChangeBtn />);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("absolute");
  });

  it("renders correctly with props", () => {
    render(<ChangeBtn className="test" disabled />);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveClass("test");
    expect(buttonElement).toBeDisabled();
  });

  it("handles onClick event", async () => {
    render(<ChangeBtn onClick={mockOnClick} />);
    const buttonElement = screen.getByRole("button");

    await user.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
