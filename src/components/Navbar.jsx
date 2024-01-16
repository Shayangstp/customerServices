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

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector(selectDarkMode);

  const currentTime = new Date();
  const isAM = currentTime.getHours() < 12;

  return (
    <section className="bg-white dark:bg-gray-800">
      <nav className="grid grid-cols-6 justify-between py-3">
        <div className="col-span-3 flex items-center">
          <div id="profile" className="flex items-center ms-8">
            <div id="profile_pic" className="text-black dark:text-gray-400">
              <AccountCircleIcon className="text-[70px]" />
            </div>
            <div id="profile_name" className="text-black dark:text-white ms-3">
              <div className="font-bold">shayan golestanipour</div>
              <div>122388822</div>
            </div>
          </div>
          <div
            id="line"
            className="border border-gray-300 h-[50%] ms-5 mt-1"
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
          <Button
            variant="contained"
            className="dark:bg-gray-900 dark:hover:bg-black dark:text-white bg-gray-300 hover:bg-gray-200 text-black"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>
          <Button
            variant="contained"
            className="dark:bg-gray-900 dark:hover:bg-black dark:text-white bg-gray-300 hover:bg-gray-200 text-black"
            onClick={() => {
              navigate("/myOrderList");
            }}
          >
            my Order List
          </Button>

          <Button
            variant="contained"
            className="dark:bg-gray-900 dark:hover:bg-black dark:text-white bg-gray-300 hover:bg-gray-200 text-black"
            onClick={() => {
              navigate("/myFinance");
            }}
          >
            my Finance
          </Button>
          <Button
            variant="outlined"
            className="border border-black dark:border-white hover:border-black ms-10 me-2"
            onClick={() => {
              dispatch(RsetDarkMode(!darkMode));
            }}
          >
            {!darkMode ? (
              <LightModeIcon className="dark:text-white" />
            ) : (
              <Brightness3Icon className="text-black" />
            )}
          </Button>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
