import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RsetDarkMode, selectDarkMode } from "../slices/mainSlices";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button } from "@mui/material";
import Clock from "react-live-clock";
import { useNavigate } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import { navData } from "../helpers/index";
import { RsetIsLoggedIn } from "../slices/authSlices";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector(selectDarkMode);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(RsetIsLoggedIn(true));
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
          <div className="grid grid-cols-6 justify-between">
            {" "}
            <div className="col-span-3 flex items-center">
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
                  <div className="font-bold">shayan golestanipour</div>
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
              className="col-span-3 flex justify-end gap-2 items-center"
            >
              {navData.map((item, index) => {
                return (
                  <Button
                    key={index}
                    variant="contained"
                    className="dark:bg-gray-900 dark:hover:bg-black dark:text-white bg-gray-300 hover:bg-gray-200 text-black"
                    onClick={() => {
                      navigate(item.href);
                    }}
                  >
                    {item.name}
                  </Button>
                );
              })}
              <Button
                className="ms-10 me-2 hover:bg-white hover:dark:bg-transparent mt-1"
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
              <LogoutIcon
                fontSize="small"
                className="text-blue-500 cursor-pointer me-1 mt-1"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
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
            <div id="profile">
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
                <span className="dark:text-white text-black ms-2">
                  shayan golestanipour
                </span>
              </div>
            </div>
            <div id="nav-buttons" className="flex items-center">
              <div id="main-buttons" className="me-2">
                {navData.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      title="Home"
                      className="hover:bg-gray-100 hover:dark:bg-gray-800"
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
                className="hover:bg-white hover:dark:bg-black"
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
                  navigate("/login");
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
    </section>
  );
};

export default Navbar;
