import React, { Fragment, useState } from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <div className="bg-gray-700 min-h-[100vh]">{children}</div>
    </div>
  );
};

export default MainLayout;
