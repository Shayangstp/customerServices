import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mainSlices from "../slices/mainSlices";
import orderSlices from "../slices/orderSlices";
import modalsSlices from "../slices/modalsSlices";
import authSlices from "../slices/authSlices";

const rootReducer = {
  auth: authSlices,
  main: mainSlices,
  order: orderSlices,
  modals: modalsSlices,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
