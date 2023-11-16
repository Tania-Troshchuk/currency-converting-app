import { Route, Routes, useLocation } from "react-router-dom";
import { About, Home, NotFound, Rates } from "./pages";
import { NavBar } from "./components";
import { useEffect } from "react";
import { routes } from "./data/routes";
import { ESStorageKeys } from "./types/converter";

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === routes.home) {
      sessionStorage.setItem(ESStorageKeys.searchParamsHome, location.search);
    } else if (location.pathname === routes.rates) {
      sessionStorage.setItem(ESStorageKeys.searchParamsRates, location.search);
    }
  }, [location.pathname, location.search]);

  return (
    <>
      <NavBar />

      <main className="w-10/12 max-w-5xl m-auto flex flex-col items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};
