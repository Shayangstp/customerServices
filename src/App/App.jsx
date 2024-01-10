import React from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Navbar from "../components/Navbar";
import { StyledEngineProvider } from "@mui/material";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer rtl />
      <StyledEngineProvider injectFirst>
        <AppRoutes />
      </StyledEngineProvider>
    </BrowserRouter>
  );
};

export default App;
