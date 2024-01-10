import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mainSlices from "../slices/mainSlices";

const rootReducer = {
  mainSlices,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
