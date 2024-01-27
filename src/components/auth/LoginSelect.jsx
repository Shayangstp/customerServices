import React, { useState } from "react";
import { Button } from "@mui/material";
import { loginSelectButtons } from "../../helpers/index";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCustomerPannel,
  selectDriverPannel,
  selectStaffPannel,
  RsetCustomerPannel,
  RsetDriverPannel,
  RsetStaffPannel,
} from "../../slices/authSlices";
import { RsetFormErrors } from "../../slices/mainSlices";

const LoginSelect = () => {
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="dark:text-white text-[40px]">Welcome</h1>
      <p className="dark:text-white">select your login page</p>
      <div id="btns" className="mt-10">
        {loginSelectButtons.map((item, idx) => {
          return (
            <Button
              variant="outlined"
              className={`dark:text-gray-200 text-[13px] rounded-2xl ms-2 ${
                idx === active
                  ? "bg-gray-700 border-blue-500 hover:bg-gray-700"
                  : "bg-transparent"
              }`}
              onClick={() => {
                setActive(idx);
                if (item.name === "Customer") {
                  dispatch(RsetCustomerPannel(true));
                  dispatch(RsetDriverPannel(false));
                  dispatch(RsetStaffPannel(false));
                  dispatch(RsetFormErrors({}));
                }
                if (item.name === "Driver") {
                  dispatch(RsetCustomerPannel(false));
                  dispatch(RsetDriverPannel(true));
                  dispatch(RsetStaffPannel(false));
                  dispatch(RsetFormErrors({}));
                }
                if (item.name === "Staff") {
                  dispatch(RsetCustomerPannel(false));
                  dispatch(RsetDriverPannel(false));
                  dispatch(RsetStaffPannel(true));
                  dispatch(RsetFormErrors({}));
                }
              }}
            >
              {item.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default LoginSelect;
