import { NavLink } from "react-router-dom";
import { routes } from "../../data/routes";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { ESStorageKeys } from "../../types/converter";

export const NavBar = () => {
  const searchParamsHome =
    sessionStorage.getItem(ESStorageKeys.searchParamsHome) ?? "";
  const searchParamsRates =
    sessionStorage.getItem(ESStorageKeys.searchParamsRates) ?? "";
  const links = [
    { to: routes.home + searchParamsHome, title: "Converter" },
    { to: routes.rates + searchParamsRates, title: "Rates" },
    { to: routes.about, title: "About" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else if (document.body.classList.contains("overflow-hidden")) {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={classNames(
        "relative flex items-center px-8 py-4 bg-emerald-900 text-lg text-white drop-shadow-md",
        `${isMenuOpen ? "h-screen" : "h-16"}`
      )}
    >
      <ul
        className={classNames(
          `${
            isMenuOpen
              ? "grow flex flex-col items-center gap-8 text-2xl"
              : "hidden"
          }`,
          "md:flex md:flex-row md:justify-start md:gap-8"
        )}
      >
        {links.map(({ to, title }) => (
          <li key={title} onClick={() => setIsMenuOpen(false)}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                classNames("tracking-wide hover:border-b", {
                  "border-b": isActive,
                })
              }
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="h-6 absolute right-5 top-5 md:hidden"
      >
        {isMenuOpen ? (
          <div className="relative flex flex-col gap-2 w-6">
            <div className="absolute h-[1px] w-full bg-white rotate-45"></div>
            <div className="absolute h-[1px] w-full bg-white -rotate-45"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-6">
            <div className="h-[1px] bg-white"></div>
            <div className="h-[1px] bg-white"></div>
            <div className="h-[1px] bg-white"></div>
          </div>
        )}
      </button>
    </nav>
  );
};
