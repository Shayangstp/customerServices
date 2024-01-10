import React, { useState, useEffect } from "react";
import { useSelect, useDispatch } from "react-redux";
import { RsetDarkMode, selectDarkMode } from "../slices/mainSlices";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import Clock from "react-live-clock";


const Navbar = () => {
  const currentTime = new Date();
  const isAM = currentTime.getHours() < 12;

  return (
    <section className="">
      <nav className="grid grid-cols-6 justify-between border border-blue-500">
        <div className="col-span-3 flex items-center">
          <div id="profile" className="flex items-center ms-14">
            <div id="profile_pic" className="text-black">
              <AccountCircleIcon className="text-[70px]" />
            </div>
            <div id="profile_name" className="text-black ms-3">
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
              className="ms-3 text-light d-none d-md-inline"
              style={{ width: "60px" }}
              // onChange={(date) => console.log(date)}
            />
          </div>
        </div>
        <div
          id="items"
          className="col-span-3 flex justify-end gap-2 items-center border border-red-500 me-14"
        >
          <Button variant="contained" className="bg-gray-900 hover:bg-black">
            my Order List
          </Button>
          <Button variant="contained" className="bg-gray-900 hover:bg-black">
            my Finance
          </Button>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
