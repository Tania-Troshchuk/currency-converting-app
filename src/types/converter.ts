export interface IConverter {
  baseAmount: string;
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

export enum ESearchParams {
  baseCurrency = "base",
  quoteCurrency = "quote",
  amount = "amount",
}
