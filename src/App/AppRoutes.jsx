import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import MainLayout from "../App/Mainlayout";
import List from "../components/list/List";
import Home from "../components/home/Home";
import MainList from "../components/myOrderList/MainList";

const AppRoutes = () => {
  return (
    <Fragment>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myOrderList" element={<MainList />} />
          {/* <Route path="/deviceList" element={<DeviceList />} /> */}
        </Routes>
      </MainLayout>
    </Fragment>
  );
};

export default AppRoutes;
