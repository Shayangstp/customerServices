import React, { Fragment, useDebugValue, useEffect, useState } from "react";
import Navbar from "../components/nav/Navbar";
import { selectDarkMode, selectUser } from "../slices/mainSlices";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetIsLoggedIn,
  selectIsLoggedIn,
  selectUserIp,
  RsetUserIp,
  handleUserIp,
} from "../slices/authSlices";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const htmlClasses = !darkMode ? "dark" : "";
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const token = localStorage.getItem("token");
  console.log(user);

  useEffect(() => {
    dispatch(handleUserIp());
  });

  useEffect(() => {
    if (token) {
      dispatch(RsetIsLoggedIn(true));
    } else {
      dispatch(RsetIsLoggedIn(false));
      navigate("/");
    }
  }, [token]);

  // remove token by expiretaion time
  function removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }

  //token isExpired
  function isTokenExpired() {
    const expirationTime = localStorage.getItem("tokenExpiration");
    return expirationTime && Date.now() > parseInt(expirationTime);
  }

  function handleTokenExpiration() {
    if (isTokenExpired()) {
      removeToken();
      navigate("/");
      // console.log("Token removed from local storage as it has expired.");
    } else {
      const expirationTime = localStorage.getItem("tokenExpiration");
      const remainingTime = expirationTime - Date.now();
      // console.log(
      //   `Token expiration timer reset. Remaining time: ${remainingTime} milliseconds.`
      // );
      setTimeout(handleTokenExpiration, remainingTime);
    }
  }

  handleTokenExpiration();

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
