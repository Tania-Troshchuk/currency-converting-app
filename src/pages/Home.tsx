import { useCallback, useEffect, useState } from "react";
import { LineInput } from "../components/atoms/LineInput";
import { CustomSelect } from "../components";
import classNames from "classnames";
import { IConverter } from "../types/converter";
import { currencyAPI, useGetSymbolsQuery } from "../redux/currencyAPI";
import { useAppDispatch } from "../redux/hook";

export const Home = () => {
  const { data, isLoading } = useGetSymbolsQuery();
  const [converter, setConverter] = useState<IConverter>({
    baseAmount: "0",
    baseCurrency: "EUR",
    quoteAmount: "0",
    quoteCurrency: "UA",
  });

  const handleChanges = useCallback((value: string, key: keyof IConverter) => {
    setConverter((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  return (
    <>
      <h1 className="my-8 mx-2 text-4xl uppercase font-bold text-emerald-900 tracking-wide text-center md:text-6xl md:my-12">
        Currency converter
      </h1>

      <div
        className={classNames(
          "flex flex-col items-center w-10/12",
          "md:flex-row"
        )}
      >
        <div
          className={classNames(
            "w-full flex p-8 gap-3 bg-emerald-800 rounded-t-lg",
            "md:rounded-l-lg md:rounded-tr-none"
          )}
        >
          <LineInput
            title="Currency:"
            value={converter.baseAmount}
            handleInput={(value) => handleChanges(value, "baseAmount")}
          />

          <CustomSelect />
        </div>

        <div
          className={classNames(
            "w-full flex p-8 gap-3 bg-emerald-500 rounded-b-lg",
            "md:rounded-r-lg md:rounded-bl-none"
          )}
        >
          <LineInput
            title="Converted to:"
            value={converter.quoteAmount}
            handleInput={(value) => handleChanges(value, "quoteAmount")}
          />

          <CustomSelect />
        </div>
      </div>
    </>
  );
};
