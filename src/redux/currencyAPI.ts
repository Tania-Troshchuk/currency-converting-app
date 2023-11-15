import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "8848afff8af01069a19ba29ad00bfa69";

export const currencyAPI = createApi({
  reducerPath: "api/currency",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.exchangeratesapi.io/v1/",
  }),
  endpoints: (builder) => ({
    getSymbols: builder.query<undefined, void>({
      query: () => `symbols?access_key=${API_KEY}`,
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetSymbolsQuery } = currencyAPI;
