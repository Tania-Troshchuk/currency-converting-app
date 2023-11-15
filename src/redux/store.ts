import { configureStore } from "@reduxjs/toolkit";
import { currencyAPI } from "./currencyAPI";

const store = configureStore({
  reducer: {
    [currencyAPI.reducerPath]: currencyAPI.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      currencyAPI.middleware,
    ]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
