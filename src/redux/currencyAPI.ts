import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRate } from "../types/converter";

export const currencyAPI = createApi({
  reducerPath: "api/currency",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bank.gov.ua/NBUStatService/v1/statdirectory/",
  }),
  endpoints: (builder) => ({
    getRates: builder.query<IRate[], void>({
      query: () => 'exchange?json',
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetRatesQuery } = currencyAPI;
