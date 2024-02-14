import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode } from "../../../slices/mainSlices";
import {
  RsetDriverPhoneNumber,
  RsetDriverRegisterCode,
  selectDriverPhoneNumber,
  selectDriverRegisterCode,
} from "../../../slices/authSlices";
import { postDriverSMS } from "../../../services/authServices";
import { darkInputs, lightInputs } from "../../../common/Input";

// 09353835262

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "iranSans, Arial, sans-serif", // Change the font family as desired
  },
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const DriverLogin = () => {
  const [showCode, setShowCode] = useState(false);
  const dispatch = useDispatch();
  const driverPhoneNumber = useSelector(selectDriverPhoneNumber);
  const driverRegisterCode = useSelector(selectDriverRegisterCode);
  const darkMode = useSelector(selectDarkMode);

  //inputs with styles
  let Inputs = !darkMode ? darkInputs : lightInputs;

  const handleDriverLoggin = async () => {
    const values = {
      numbers: String(driverPhoneNumber),
      message: "this is test",
    };

    if (!showCode) {
      console.log({ driverPhoneNumber });
      setShowCode(true);
      const postDriverSMSRes = await postDriverSMS(values);
      console.log(postDriverSMSRes);
    } else {
      console.log({
        driverRegisterCode,
      });
    }
  };

  return (
    <div className="md:w-[50%] w-[90%] h-[100%]">
      <div dir="rtl" className="flex flex-col xl:mt-[65%] mt-10 mb-10 xl:mb-0">
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div id="login" className="flex flex-col gap-5">
              {!showCode ? (
                <Inputs
                  dir="rtl"
                  type="number"
                  value={driverPhoneNumber}
                  label="شماره موبایل خود را وارد کنید"
                  id="custom-css-outlined-input"
                  onChange={(e) => {
                    dispatch(RsetDriverPhoneNumber(e.target.value));
                  }}
                />
              ) : (
                <Inputs
                  dir="rtl"
                  type="number"
                  value={driverRegisterCode}
                  label="کد ارسالی را وارد کنید"
                  id="custom-css-outlined-input"
                  onChange={(e) => {
                    dispatch(RsetDriverRegisterCode(e.target.value));
                  }}
                />
              )}
              <Button
                variant="outlined"
                style={{ borderRadius: "15px" }}
                className="dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500"
                onClick={handleDriverLoggin}
              >
                {showCode ? "ورود" : "ثبت"}
              </Button>
            </div>
          </ThemeProvider>
        </CacheProvider>
      </div>
    </div>
  );
};

export default DriverLogin;
