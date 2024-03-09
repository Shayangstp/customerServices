import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { loginSelectButtons } from "../../helpers/index";
import { useSelector, useDispatch } from "react-redux";
import { RsetDarkMode, selectDarkMode } from "../../slices/mainSlices";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness3Icon from "@mui/icons-material/Brightness3";
//slices
import {
  selectCustomerPannel,
  selectDriverPannel,
  selectStaffPannel,
  RsetCustomerPannel,
  RsetDriverPannel,
  RsetStaffPannel,
  RsetCustomerCodeMeli,
} from "../../slices/authSlices";
import { RsetFormErrors } from "../../slices/mainSlices";

const LoginSelect = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const darkMode = useSelector(selectDarkMode);

  const handleInputsReset = () => {
    dispatch(RsetCustomerCodeMeli(""));
  };

  useEffect(() => {
    dispatch(RsetCustomerPannel(true));
    dispatch(RsetDriverPannel(false));
    dispatch(RsetStaffPannel(false));
  }, []);

  return (
    <div>
      <div
        className="xl:mt-5 xl:ms-5"
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
      <div className="flex flex-col justify-center items-center xl:mt-[50%]">
        <h1 className="dark:text-white text-[20px]">
          سامانه رهگیری سفارشات مشتری
        </h1>
        <p className="dark:text-white text-[13px] mt-4">
          لطفا نقش خود را انتخاب نمایید
        </p>
        <div id="btns" className="xl:mt-10 mt-5">
          {loginSelectButtons.map((item, idx) => {
            return (
              <Button
                variant="outlined"
                className={`dark:text-gray-200 hover:bg-blue-200 hover:dark:bg-transparent border-gray-500 hover:border-blue-300 hover:dark:border-blue-500 text-black md:text-[13px] text-[10px] mb-4 xl:mb-0  rounded-2xl ms-2 px-5 ${
                  idx === active
                    ? "dark:bg-gray-700 bg-blue-300 dark:border-blue-500 hover:dark:bg-gray-700 hover:bg-blue-300 border-gray-600"
                    : "bg-transparent"
                }`}
                onClick={() => {
                  setActive(idx);
                  if (item.no === 2) {
                    dispatch(RsetCustomerPannel(true));
                    dispatch(RsetDriverPannel(false));
                    dispatch(RsetStaffPannel(false));
                    dispatch(RsetFormErrors({}));
                    handleInputsReset();
                  }
                  if (item.no === 1) {
                    dispatch(RsetCustomerPannel(false));
                    dispatch(RsetDriverPannel(true));
                    dispatch(RsetStaffPannel(false));
                    dispatch(RsetFormErrors({}));
                    handleInputsReset();
                  }
                  if (item.no === 3) {
                    dispatch(RsetCustomerPannel(false));
                    dispatch(RsetDriverPannel(false));
                    dispatch(RsetStaffPannel(true));
                    dispatch(RsetFormErrors({}));
                    handleInputsReset();
                  }
                }}
              >
                {item.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoginSelect;
