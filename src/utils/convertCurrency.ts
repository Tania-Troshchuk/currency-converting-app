import { IRate } from "../types/converter";

export const convertCurrency = (
  amount: string,
  from: string,
  to: string,
  rates: IRate[],
  decimals?: number
): string => {
  const fromRate = rates.find((el) => from === el.cc)?.rate;
  const toRate = rates.find((el) => to === el.cc)?.rate;

  if (!fromRate || !toRate) return "0";

  const result = (+amount * +fromRate) / +toRate;

  return result.toFixed(decimals ?? 2).toString();
};
