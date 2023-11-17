import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomSelect } from "../../../components";

describe("CustomSelect", () => {
  const mockList = ["Option 1", "Option 2", "Option 3"];
  const mockHandleSelect = jest.fn();
  const user = userEvent.setup();

  it("renders correctly only without selected prop", () => {
    render(<CustomSelect list={mockList} handleSelect={mockHandleSelect} />);
    const selectElement = screen.getByTestId("custom-select");
    const selectTitle = screen.getByTestId("custom-select-title");

    expect(selectElement).toBeInTheDocument();
    expect(selectTitle).toHaveTextContent("---");
  });

  it("renders correctly with selected prop", () => {
    render(
      <CustomSelect
        list={mockList}
        selected={mockList[0]}
        handleSelect={mockHandleSelect}
      />
    );

    const selectTitle = screen.getByTestId("custom-select-title");

    expect(selectTitle).toHaveTextContent(mockList[0]);
  });

  it("opens and closes items list by user click", async () => {
    render(
      <CustomSelect
        list={mockList}
        selected={mockList[0]}
        handleSelect={mockHandleSelect}
      />
    );

    const select = screen.getByTestId("custom-select");

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.queryByText(mockList[1])).not.toBeInTheDocument();

    await user.click(select);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText(mockList[1])).toBeInTheDocument();

    await user.click(screen.getByRole("list"));

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.queryByText(mockList[1])).not.toBeInTheDocument();
  });

  it("closes items list by user click outside", async () => {
    render(
      <div data-testid="outside">
        <CustomSelect
          list={mockList}
          selected={mockList[0]}
          handleSelect={mockHandleSelect}
        />
      </div>
    );

    const select = screen.getByTestId("custom-select");
    const outside = screen.getByTestId("outside");

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    await user.click(select);

    expect(screen.getByRole("list")).toBeInTheDocument();
    await user.click(outside);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("handles handleSelect event", async () => {
    render(
      <CustomSelect
        list={mockList}
        selected={mockList[0]}
        handleSelect={mockHandleSelect}
      />
    );

    const select = screen.getByTestId("custom-select");

    await user.click(select);
    await user.click(screen.getByText(mockList[1]));

    expect(mockHandleSelect).toHaveBeenCalledWith(mockList[1]);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
