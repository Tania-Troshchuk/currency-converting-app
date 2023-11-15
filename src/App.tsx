import { Route, Routes } from "react-router-dom";
import { About, Home, NotFound, Rates } from "./pages";
import { NavBar } from "./components";

export const App = () => (
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
