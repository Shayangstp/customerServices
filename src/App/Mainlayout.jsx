import React, { Fragment, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../slices/mainSlices";

const MainLayout = ({ children }) => {
  const darkMode = useSelector(selectDarkMode);
  const htmlClasses = !darkMode ? "dark" : "";
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className={htmlClasses}>
      <div className="bg-gray-400 dark:bg-gray-900 min-h-[100vh]">
        {isLoggedIn && <Navbar />}
        <div className="max-w-[1920px] mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
