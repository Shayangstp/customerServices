import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mainSlices from "../slices/mainSlices";
import orderSlices from "../slices/orderSlices";
import modalsSlices from "../slices/modalsSlices";
import authSlices from "../slices/authSlices";
import customerSlices from "../slices/customerSlices";
import companySlices from "../slices/companySlices";

const rootReducer = {
  auth: authSlices,
  main: mainSlices,
  order: orderSlices,
  modals: modalsSlices,
  customer: customerSlices,
  company: companySlices,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
