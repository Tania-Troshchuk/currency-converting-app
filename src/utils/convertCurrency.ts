import { IRate } from "../types/converter";

export const convertCurrency = (
  amount: string,
  from: string,
  to: string,
  rates: IRate[],
  decimals?: number,
): string => {
  const fromRate = +(rates.find((el) => from === el.cc)?.rate ?? "0");
  const toRate = +(rates.find((el) => to === el.cc)?.rate ?? "0");
  const result = (+amount * fromRate) / toRate;

  return result.toFixed(decimals ?? 2).toString();
};
