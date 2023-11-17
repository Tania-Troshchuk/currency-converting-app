import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Loader } from "../../../components";

describe("Loader Component", () => {
  it("renders correctly", () => {
    render(<Loader />);

    const loader = screen.getByTestId("loader");

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass("fixed top-0 left-0 right-0 bottom-0");
  });

  it('adds "overflow-hidden" class to document body on mount', () => {
    render(<Loader />);

    const loader = screen.getByTestId("loader");

    expect(loader).toBeInTheDocument();
    expect(document.body).toHaveClass("overflow-hidden");
  });

  it('removes "overflow-hidden" class from document body on unmount', () => {
    const component = render(<Loader />);

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    component.unmount();
    expect(loader).not.toBeInTheDocument();
    expect(document.body).not.toHaveClass("overflow-hidden");
  });
});
