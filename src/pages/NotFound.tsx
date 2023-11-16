import { Link } from "react-router-dom";
import { routes } from "../data/routes";
import { ESStorageKeys } from "../types/converter";

export const NotFound = () => {
  const searchParamsHome = sessionStorage.getItem(ESStorageKeys.searchParamsHome) ?? '';

  return (
    <div className="flex flex-col h-[60vh] justify-center items-center gap-12 tracking-wide ">
      <p className="text-3xl font-bold text-emerald-800">
        404 | Page not found
      </p>

      <Link
        to={routes.home + searchParamsHome}
        className="p-2 border-2 rounded border-emerald-800 cursor-pointer text-xl text-emerald-800 hover:bg-emerald-100"
      >
        Return to home page
      </Link>
    </div>
  );
}
