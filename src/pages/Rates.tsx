import { useSearchParams } from "react-router-dom";
import { CurrencyCard, ErrorMsg, Loader, RatesTable } from "../components";
import { useGetRatesQuery } from "../redux/currencyAPI";
import { ESearchParams, IConverter, IRateTable } from "../types/converter";
import { useCallback, useEffect, useMemo, useState } from "react";
import { convertCurrency } from "../utils/convertCurrency";

interface ICurrency extends Pick<IConverter, "baseAmount" | "baseCurrency"> {}

export const Rates = () => {
  const { data, isError, isLoading } = useGetRatesQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currency, setCurrency] = useState<ICurrency | null>(null);

  const currencyList: string[] = useMemo(
    () => data?.map((el) => el.cc).sort() ?? [],
    [data]
  );

  const rateList: IRateTable[] | null = useMemo(() => {
    if (!data) return null;

    const list = data.map((el) => {
      const oneUnit = convertCurrency(
        "1",
        currency?.baseCurrency || "",
        el.cc,
        data
      );

      const amount = convertCurrency(
        currency?.baseAmount || "",
        currency?.baseCurrency || "",
        el.cc,
        data
      );

      return {
        currency: el.cc,
        oneUnit,
        amount,
      };
    });

    return list?.sort((a, b) => a.currency.localeCompare(b.currency));
  }, [currency?.baseAmount, currency?.baseCurrency, data]);

  const handleChanges = useCallback(
    (value: string, key: keyof ICurrency) => {
      setSearchParams((params) => {
        params.set(ESearchParams[key], value);
        return params;
      });
    },
    [setSearchParams]
  );

  useEffect(() => {
    const baseAmount = searchParams.get(ESearchParams.baseAmount);
    const baseCurrency = searchParams.get(ESearchParams.baseCurrency);

    setCurrency({ baseAmount, baseCurrency });
  }, [data, searchParams]);

  return (
    <>
      {isLoading && <Loader />}

      <h2 className="main-header">Rates</h2>

      <ErrorMsg isError={isError} />

      <CurrencyCard
        className="pb-10 bg-emerald-800 rounded-lg md:w-3/5"
        inputTitle="Currency:"
        inputValue={currency?.baseAmount}
        handleInput={(value) => handleChanges(value, "baseAmount")}
        selectList={currencyList}
        selectedItem={currency?.baseCurrency}
        handleSelect={(item) => handleChanges(item, "baseCurrency")}
      />

      {rateList && <RatesTable list={rateList} />}
    </>
  );
};
