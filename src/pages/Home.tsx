import { useCallback, useEffect, useMemo, useState } from "react";
import { LineInput } from "../components/atoms/LineInput";
import { ChangeBtn, CustomSelect } from "../components";
import classNames from "classnames";
import { ESearchParams, IConverter } from "../types/converter";
import { useGetRatesQuery } from "../redux/currencyAPI";
import { useSearchParams } from "react-router-dom";
import { convertCurrency } from "../utils/convertCurrency";

export const Home = () => {
  const { data, isError } = useGetRatesQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const [converter, setConverter] = useState<IConverter | null>(null);

  const ratesList: string[] = useMemo(
    () => data?.map((el) => el.cc).sort() ?? [],
    [data]
  );

  const handleChanges = useCallback(
    (value: string, key: keyof IConverter) => {
      if (key === "baseAmount") {
        setSearchParams((params) => {
          params.set(ESearchParams.amount, value);
          return params;
        });
      }

      if (key === "baseCurrency" || key === "quoteCurrency") {
        setSearchParams((params) => {
          params.set(ESearchParams[key], value);
          return params;
        });
      }
    },
    [setSearchParams]
  );

  const onClickChangeBtn = useCallback(() => {
    setSearchParams((params) => {
      converter?.quoteCurrency
        ? params.set(ESearchParams.baseCurrency, converter?.quoteCurrency)
        : params.delete(ESearchParams.baseCurrency);

      converter?.baseCurrency
        ? params.set(ESearchParams.quoteCurrency, converter?.baseCurrency)
        : params.delete(ESearchParams.quoteCurrency);
      return params;
    });
  }, [converter?.baseCurrency, converter?.quoteCurrency, setSearchParams]);

  useEffect(() => {
    const baseAmount = searchParams.get(ESearchParams.amount);
    const baseCurrency = searchParams.get(ESearchParams.baseCurrency);
    const quoteCurrency = searchParams.get(ESearchParams.quoteCurrency);
    const quoteAmount = convertCurrency(
      baseAmount || "0",
      baseCurrency || "",
      quoteCurrency || "",
      data ?? []
    );

    setConverter({
      baseAmount,
      baseCurrency,
      quoteAmount,
      quoteCurrency,
    });
  }, [data, searchParams]);

  return (
    <>
      <h1 className="my-8 mx-2 text-4xl uppercase font-bold text-emerald-900 tracking-wide text-center md:text-6xl md:my-12">
        Currency converter
      </h1>

      {isError && <div>Something went wrong</div>}

      <div
        className={classNames(
          "relative flex flex-col items-center w-10/12",
          "md:flex-row"
        )}
      >
        <div
          className={classNames(
            "w-full flex p-8 pb-10 gap-3 bg-emerald-800 rounded-t-lg",
            "md:rounded-l-lg md:rounded-tr-none md:pb-8 md:pr-12"
          )}
        >
          <LineInput
            title="Currency:"
            value={converter?.baseAmount ?? '0'}
            handleInput={(value) => handleChanges(value, "baseAmount")}
          />

          <CustomSelect
            list={ratesList}
            selected={converter?.baseCurrency}
            handleSelect={(item) => handleChanges(item, "baseCurrency")}
          />
        </div>

        <ChangeBtn onClick={onClickChangeBtn} />

        <div
          className={classNames(
            "w-full flex p-8 gap-3 bg-emerald-500 rounded-b-lg",
            "md:rounded-r-lg md:rounded-bl-none md:pl-12"
          )}
        >
          <LineInput
            title="Converted to:"
            value={converter?.quoteAmount ?? '0'}
            handleInput={(value) => handleChanges(value, "quoteAmount")}
          />

          <CustomSelect
            list={ratesList}
            selected={converter?.quoteCurrency}
            handleSelect={(item) => handleChanges(item, "quoteCurrency")}
          />
        </div>
      </div>
    </>
  );
};
