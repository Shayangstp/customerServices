import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import MainLayout from "../App/Mainlayout";
import BasicTable from "../components/List";
const AppRoutes = () => {
  return (
    <Fragment>
      <MainLayout>
        <BasicTable />
        <Routes>
          {/* <Route path="*" element={<ErrorPage />} /> */}
          {/* <Route
          path="/"
          element={tokenIsValid ? <Navigate to="/home" /> : <Login />}
        /> */}
          {/* <Route path="/deviceList" element={<DeviceList />} /> */}
        </Routes>
      </MainLayout>
    </Fragment>
  );
};

export default AppRoutes;
