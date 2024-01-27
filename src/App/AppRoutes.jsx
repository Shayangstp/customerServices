import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import MainLayout from "../App/Mainlayout";
import Home from "../components/home/Home";
import MainList from "../components/myOrderList/MainList";
import MainAuth from "../components/auth/MainAuth";

const AppRoutes = () => {
  return (
    <Fragment>
      <MainLayout>
        <Routes>
          <Route path="/" element={<MainAuth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/myOrderList" element={<MainList />} />
          {/* <Route path="/deviceList" element={<DeviceList />} /> */}
        </Routes>
      </MainLayout>
    </Fragment>
  );
};

export default AppRoutes;
