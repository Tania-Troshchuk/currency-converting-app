import { useCallback, useEffect, useMemo, useState } from "react";
import { ChangeBtn, CurrencyCard, ErrorMsg, Loader, Note } from "../components";
import classNames from "classnames";
import { ESearchParams, IConverter } from "../types/converter";
import { useGetRatesQuery } from "../redux/currencyAPI";
import { useSearchParams } from "react-router-dom";
import { convertCurrency } from "../utils/convertCurrency";

export const Home = () => {
  const { data, isError, isLoading } = useGetRatesQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const [converter, setConverter] = useState<IConverter | null>(null);

  const currencyList: string[] = useMemo(
    () => data?.map((el) => el.cc).sort() ?? [],
    [data]
  );

  const notes = useMemo(() => {
    const date =
      data?.find((el) => el.cc === converter?.quoteCurrency)?.exchangedate ??
      "";

    const quoteRate = convertCurrency(
      "1",
      converter?.baseCurrency || "",
      converter?.quoteCurrency || "",
      data ?? [],
      6
    );

    return { date, quoteRate };
  }, [converter?.baseCurrency, converter?.quoteCurrency, data]);

  const handleChanges = useCallback(
    (value: string, key: keyof IConverter) => {
      
      //TODO: add logic for quoteAmount and simplified this

      if (key === "baseAmount") {
        setSearchParams((params) => {
          params.set(ESearchParams.baseAmount, value);
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
    const baseAmount = searchParams.get(ESearchParams.baseAmount);
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
      {isLoading && <Loader />}

      <h1 className="main-header md:my-12">Currency converter</h1>

      <ErrorMsg isError={isError} />

      <div
        className={classNames(
          "relative flex flex-col items-center w-full",
          "md:flex-row"
        )}
      >
        <CurrencyCard
          className={classNames(
            "pb-10 bg-emerald-800 rounded-t-lg",
            "md:rounded-l-lg md:rounded-tr-none md:pb-8 md:pr-12"
          )}
          inputTitle="Currency:"
          inputValue={converter?.baseAmount}
          handleInput={(value) => handleChanges(value, "baseAmount")}
          selectList={currencyList}
          selectedItem={converter?.baseCurrency}
          handleSelect={(item) => handleChanges(item, "baseCurrency")}
        />

        <ChangeBtn onClick={onClickChangeBtn} />

        <CurrencyCard
          className={classNames(
            "bg-emerald-500 rounded-b-lg",
            "md:rounded-r-lg md:rounded-bl-none md:pl-12"
          )}
          inputTitle="Converted to:"
          inputValue={converter?.quoteAmount ?? "0"}
          handleInput={(value) => handleChanges(value, "quoteAmount")}
          selectList={currencyList}
          selectedItem={converter?.quoteCurrency}
          handleSelect={(item) => handleChanges(item, "quoteCurrency")}
        />
      </div>

      {converter?.baseCurrency && converter.quoteCurrency && (
        <Note
          baseCurrency={converter.baseCurrency}
          quoteCurrency={converter.quoteCurrency}
          quoteRate={notes.quoteRate}
          date={notes.date}
        />
      )}
    </>
  );
};
