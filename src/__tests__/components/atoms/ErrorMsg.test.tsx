import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ErrorMsg } from "../../../components";

describe("ErrorMsg", () => {
  it("renders error message when isError is true", () => {
    render(<ErrorMsg isError={true} />);

    expect(
      screen.getByText(/Oops! Looks like something went wrong/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please try again later, and thanks for your patience/)
    ).toBeInTheDocument();
  });

  it("does not render error message when isError is false", () => {
    render(<ErrorMsg isError={false} />);

    expect(
      screen.queryByText(/Oops! Looks like something went wrong/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Please try again later, and thanks for your patience/)
    ).not.toBeInTheDocument();
  });
});
