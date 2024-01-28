import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/nav/Navbar";
import { selectDarkMode } from "../slices/mainSlices";
import { useDispatch, useSelector } from "react-redux";
import { RsetIsLoggedIn, selectIsLoggedIn } from "../slices/authSlices";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const htmlClasses = !darkMode ? "dark" : "";
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(RsetIsLoggedIn(true));
    } else {
      dispatch(RsetIsLoggedIn(false));
    }
  }, [token]);

  return (
    <div className={htmlClasses}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-[100vh]">
        {token && <Navbar />}
        <div className="max-w-[1920px] mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
