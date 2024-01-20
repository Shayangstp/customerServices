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
import {
  RsetCustomerLogginPage,
  selectCustomerLoginPage,
} from "../../../slices/authSlices";
import {
  RsetDriverPhoneNumber,
  RsetDriverRegisterCode,
  selectDriverPhoneNumber,
  selectDriverRegisterCode,
} from "../../../slices/authSlices";
import { postDriverSMS } from "../../../services/authServices";

// 09353835262

//rtl and nput design
const Inputs = styled(TextField)({
  "& label.Mui-focused": {
    color: "#5a8de0",
  },
  "& label": {
    fontSize: "12px",
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "blue",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
      borderRadius: "15px",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5a8de0",
    },
  },
});

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
    <div className="w-[50%] h-[100%]">
      <div dir="rtl" className="flex flex-col mt-[65%]">
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div id="login" className="flex flex-col gap-5">
              {!showCode ? (
                <Inputs
                  dir="rtl"
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
