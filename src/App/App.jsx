import React from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { StyledEngineProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <ToastContainer rtl />
      <StyledEngineProvider injectFirst>
        <AppRoutes />
      </StyledEngineProvider>
    </BrowserRouter>
  );
};

export default App;
