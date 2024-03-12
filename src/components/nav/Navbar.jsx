import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import MenuIcon from "@mui/icons-material/Menu";
//
import Clock from "react-live-clock";
import { useNavigate } from "react-router-dom";
import { navData } from "../../helpers/index";
import { RsetIsLoggedIn, handleUserData } from "../../slices/authSlices";
import OffCanvas from "./OffCanvas";
//slice
import {
  RsetShowOffCanvas,
  selectShowOffCanvas,
} from "../../slices/mainSlices";
import {
  RsetDarkMode,
  selectDarkMode,
  selectUser,
} from "../../slices/mainSlices";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector(selectDarkMode);
  const showOffCanvas = useSelector(selectShowOffCanvas);
  const user = useSelector(selectUser);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(RsetIsLoggedIn(true));
      dispatch(handleUserData());
    } else {
      dispatch(RsetIsLoggedIn(false));
    }
  }, [token]);

  const currentTime = new Date();
  const isAM = currentTime.getHours() < 12;

  const handleNavbar = () => {
    setNavOpen(!navOpen);
  };

  return (
    <section className="bg-white dark:bg-black">
      <nav
        className={`py-3 border-b dark:border-gray-700 border-gray-300 ${
          navOpen ? "h-[90px] transition-all" : "h-[60px] transition-all"
        }`}
      >
        {navOpen ? (
          <div className="grid grid-cols-6 xl:mt-0 mt-3">
            {" "}
            <div
              className="cursor-pointer ms-5 mt-1 xl:hidden"
              onClick={() => {
                dispatch(RsetShowOffCanvas(!showOffCanvas));
              }}
            >
              <MenuIcon className="dark:text-white text-black xl:hidden col-span-1 hover:dark:text-blue-500" />
            </div>
            <div className="col-span-3 xl:flex hidden items-center ">
              <div id="profile" className="flex items-center ms-8">
                <div
                  id="profile_pic"
                  className={`text-gray-400 ${
                    navOpen
                      ? "opacity-100 transition-opacity delay-200"
                      : "opacity-0"
                  }`}
                >
                  <AccountCircleIcon className="text-[70px]" />
                </div>
                <div
                  id="profile_name"
                  className="text-black dark:text-white ms-3"
                >
                  <div className="font-bold">
                    {user.FirstName + " " + user.LastName}
                  </div>
                  <div>122388822</div>
                </div>
              </div>
              <div
                id="line"
                className="border dark:border-gray-700 h-[50%] ms-5 mt-1"
              ></div>
              <div id="time" className="d-flex ">
                <Clock
                  format="HH:mm:ss"
                  interval={1000}
                  ticking={true}
                  className="ms-3 text-light d-none d-md-inline dark:text-white"
                  style={{ width: "60px" }}
                  // onChange={(date) => console.log(date)}
                />
              </div>
            </div>
            <div
              id="items"
              className="xl:col-span-3 col-span-5 flex justify-end gap-2 items-center"
            >
              {navData.map((item, index) => {
                return (
                  <Button
                    key={index}
                    variant="contained"
                    className="dark:bg-gray-900 dark:hover:bg-black dark:text-white bg-gray-300 hover:bg-gray-200 text-black xl:inline-block hidden"
                    onClick={() => {
                      navigate(item.href);
                    }}
                  >
                    {item.name}
                  </Button>
                );
              })}
              <Button
                className="ms-10 me-2 hover:bg-white hover:dark:bg-transparent my-1"
                onClick={() => {
                  dispatch(RsetDarkMode(!darkMode));
                }}
              >
                {!darkMode ? (
                  <LightModeIcon
                    fontSize="small"
                    className="dark:text-white dark:hover:text-blue-500 cursor-pointer"
                  />
                ) : (
                  <Brightness3Icon
                    fontSize="small"
                    className="text-black hover:text-blue-500 cursor-pointer"
                  />
                )}
              </Button>
              <div
                id="line"
                className="border dark:border-gray-700 h-[50%] me-5 mt-1"
              ></div>
              <LogoutIcon
                fontSize="small"
                className="text-blue-500 cursor-pointer me-1 mt-1"
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(RsetIsLoggedIn(false));
                  navigate("/");
                }}
              />
              <div
                className={`rotate-[270deg] me-10 text-blue-500 cursor-pointer hover:text-blue-400 mt-1`}
                onClick={handleNavbar}
              >
                <DoubleArrowIcon fontSize="small" />
              </div>
            </div>{" "}
          </div>
        ) : (
          <div className="flex justify-between">
            <div
              id="menu"
              className="cursor-pointer ms-5 mt-1 md:hidden"
              onClick={() => {
                dispatch(RsetShowOffCanvas(!showOffCanvas));
              }}
            >
              <MenuIcon className="dark:text-white text-black xl:hidden col-span-1 hover:dark:text-blue-500" />
            </div>
            <div id="profile" className="hidden md:inline-block">
              <div className="ms-10 mt-1 font-bold text-black dark:text-white flex">
                <div
                  id="profile_pic"
                  className={`text-black dark:text-gray-400 ${
                    !navOpen
                      ? "opacity-100 transition-opacity delay-200"
                      : "opacity-0"
                  }`}
                >
                  <AccountCircleIcon className="text-[30px]" />
                </div>
                <span className="dark:text-white text-black ms-2 text-[12px] my-auto">
                  {user.FirstName + " " + user.LastName}
                </span>
              </div>
            </div>
            <div id="nav-buttons" className="flex items-center">
              <div id="main-buttons" className="me-2">
                {navData.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      title={item.title}
                      className="hover:bg-gray-100 hover:dark:bg-gray-800 dark:text-white text-black transition-all delay-75"
                      onClick={() => {
                        navigate(item.href);
                      }}
                    >
                      {item.icon}
                    </Button>
                  );
                })}
              </div>
              <div
                id="line"
                className="border dark:border-gray-700 h-[50%] me-5 mt-1"
              ></div>
              <div
                className="hover:bg-white hover:dark:bg-black mt-2"
                onClick={() => {
                  dispatch(RsetDarkMode(!darkMode));
                }}
              >
                {!darkMode ? (
                  <LightModeIcon
                    fontSize="small"
                    className="dark:text-white dark:hover:text-blue-500 cursor-pointer"
                  />
                ) : (
                  <Brightness3Icon
                    fontSize="small"
                    className="text-black hover:text-blue-500 cursor-pointer"
                  />
                )}
              </div>
              <LogoutIcon
                fontSize="small"
                className="text-blue-500 cursor-pointer ms-5 mt-1"
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(RsetIsLoggedIn(false));
                  navigate("/");
                }}
              />
              <Button
                onClick={handleNavbar}
                className={`${
                  !navOpen ? "rotate-[90deg]" : "rotate-[90deg]"
                } mt-1`}
              >
                <DoubleArrowIcon fontSize="small" />
              </Button>
            </div>
          </div>
        )}
      </nav>
      <OffCanvas />
    </section>
  );
};

export default Navbar;
