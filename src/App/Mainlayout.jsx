import React, { Fragment, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../slices/mainSlices";

const MainLayout = ({ children }) => {
  const darkMode = useSelector(selectDarkMode);
  const htmlClasses = !darkMode ? "dark" : "";
  return (
    <div className={htmlClasses}>
      <div className="bg-gray-400 dark:bg-gray-700 min-h-[100vh]">
        <Navbar />
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
