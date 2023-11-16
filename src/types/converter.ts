export interface IConverter {
  baseAmount: string | null;
  baseCurrency: string | null;
  quoteAmount: string;
  quoteCurrency: string | null;
}

export interface IRate {
  cc: string;
  exchangedate: string;
  r030: number;
  rate: number;
  txt: string;
}

export interface IRateTable {
  currency: string;
  oneUnit: string;
  amount: string
}

export enum ESearchParams {
  baseCurrency = "base",
  quoteCurrency = "quote",
  baseAmount = "amount",
}

export enum ESStorageKeys {
  searchParamsHome = "searchParamsHome",
  searchParamsRates = "searchParamsRates",
}
