import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { NavBar } from "../../../components";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { ESStorageKeys } from "../../../types/converter";

describe("NavBar Component", () => {
  const user = userEvent.setup();
  const initLinks = [
    { to: "/", title: "Converter" },
    { to: "/rates", title: "Rates" },
    { to: "/about", title: "About" },
  ];

  it("renders correctly with closed menu and clear session storage", () => {
    render(<NavBar />, { wrapper: BrowserRouter });

    const navElement = screen.getByRole("navigation");
    const navList = screen.getByRole("list");
    const linkElements = screen.getAllByRole("link");
    const btnElement = screen.getByRole("button");

    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass("h-16");
    expect(navList).toHaveClass("hidden");
    expect(btnElement.firstElementChild?.children.length).toBe(3);

    linkElements.forEach((link, i) => {
      expect(link).toHaveAttribute("href", initLinks[i].to);
      expect(link).toHaveTextContent(initLinks[i].title);
    });
  });

  it("openes and closes menu by user click", async () => {
    render(<NavBar />, { wrapper: BrowserRouter });

    const navElement = screen.getByRole("navigation");
    const navList = screen.getByRole("list");
    const btnElement = screen.getByRole("button");
    const linkElements = screen.getAllByRole("link");

    await user.click(btnElement);

    expect(navElement).toHaveClass("h-screen");
    expect(navList).not.toHaveClass("hidden");
    expect(document.body).toHaveClass("overflow-hidden");
    expect(btnElement.firstElementChild?.children.length).toBe(2);

    await user.click(linkElements[1]);
    expect(document.body).not.toHaveClass("overflow-hidden");
    expect(navList).toHaveClass("hidden");
  });

  it("closes opened menu for width screen", async () => {
    render(<NavBar />, { wrapper: BrowserRouter });

    const navList = screen.getByRole("list");
    const btnElement = screen.getByRole("button");

    await user.click(btnElement);
    expect(navList).not.toHaveClass("hidden");

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 500,
      });
    });
    waitFor(() => expect(navList).not.toHaveClass("hidden"));

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 800,
      });
    });
    waitFor(() => expect(navList).toHaveClass("hidden"));
  });

  it("set query params to links from session starage", () => {
    sessionStorage.setItem(ESStorageKeys.searchParamsHome, "?test-home");
    sessionStorage.setItem(ESStorageKeys.searchParamsRates, "?test-rates");
    const linksWithParams = [
      { to: "/?test-home", title: "Converter" },
      { to: "/rates?test-rates", title: "Rates" },
      { to: "/about", title: "About" },
    ];

    render(<NavBar />, { wrapper: BrowserRouter });

    const linkElements = screen.getAllByRole("link");

    linkElements.forEach((link, i) => {
      expect(link).toHaveAttribute("href", linksWithParams[i].to);
      expect(link).toHaveTextContent(linksWithParams[i].title);
    });
  });
});
