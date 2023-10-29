import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

//FeactureAPIs
import { ItemsApi } from "./features/ItemsApi";
export const store = configureStore({
  reducer: {
    [ItemsApi.reducerPath]: ItemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ItemsApi.middleware),
});

setupListeners(store.dispatch);
