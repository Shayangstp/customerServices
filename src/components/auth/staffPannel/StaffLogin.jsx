import React, { useState, useEffect } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";
import GoogleLogin from "@leecheuk/react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch, useSelector } from "react-redux";
import { gapi } from "gapi-script";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
//api
import { loginStaff } from "../../../services/authServices";
//slices
import {
  RsetStaffCodeMeli,
  selectStaffCodeMeli,
  RsetStaffPassword,
  selectStaffPassword,
  RsetCustomerLogginPage,
  handleStaffLogin,
  selectCustomerLoginPage,
  selectIsLoggedIn,
} from "../../../slices/authSlices";
import {
  RsetFormErrors,
  selectFormErrors,
  selectUser,
  selectDarkMode,
} from "../../../slices/mainSlices";
import { darkInputs, lightInputs } from "../../../common/Input";

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

const StaffLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerLogginPage = useSelector(selectCustomerLoginPage);
  const staffCodeMeli = useSelector(selectStaffCodeMeli);
  const staffPassword = useSelector(selectStaffPassword);
  const formErrors = useSelector(selectFormErrors);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const darkMode = useSelector(selectDarkMode);
  //inputs with styles
  let Inputs = !darkMode ? darkInputs : lightInputs;

  //validation
  const staffCodeMeliIsValid = staffCodeMeli.length === 10;
  const staffPasswordIsValid = staffPassword && staffPassword.length >= 5;
  const formIsValid = staffCodeMeliIsValid && staffPasswordIsValid;

  const validation = () => {
    var errors = {};
    if (!staffCodeMeliIsValid) {
      errors.staffCodeMeli = true;
    }
    if (!staffPassword) {
      errors.staffPassword = true;
    }
    return errors;
  };

  //sso
  const handleLoginGoogle = async (res) => {
    try {
      //   const response = await axios.post("/api/users/login", user);
      //   console.log("Login success", response.data);
      //   dispatch(RsetLoginEmail(""));
      //   dispatch(RsetLoginPassword(""));
      //   dispatch(RsetLoginGoogle(false));
      //   route.push("/");
    } catch (err) {
      console.log(err.message);
      //   dispatch(RsetLoginGoogle(false));
      //   dispatch(RsetLoginEmail(""));
      //   dispatch(RsetLoginPassword(""));
    }
  };
  const onFailure = (error) => {
    console.log("Login failed: ", error);
  };

  const clientId =
    "439984794014-hbtnkhdm5hjmgs0ekffbroo8cs5af8in.apps.googleusercontent.com";
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  //handle staff Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (formIsValid) {
      console.log({
        staffCodeMeli,
        staffPassword,
      });
      dispatch(handleStaffLogin());
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            staffCodeMeli,
            staffPassword,
          })
        )
      );
    }
  };

  if (isLoggedIn === true) {
    navigate("/home");
  }

  return (
    <div className="md:w-[50%] w-[90%] h-[100%]">
      <div dir="rtl" className="flex flex-col xl:mt-[35%] mt-10 mb-10 xl:mb-0">
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <div id="login" className="flex flex-col gap-5">
              <GoogleLogin
                clientId={
                  "439984794014-hbtnkhdm5hjmgs0ekffbroo8cs5af8in.apps.googleusercontent.com"
                }
                // onSuccess={onLoginSuccess}
                buttonText="Sign up with Google"
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                prompt="select_account"
                render={(renderProps) => (
                  <Button
                    variant="outlined"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    style={{ borderRadius: "15px", padding: "10px" }}
                    className="border dark:border-gray-600 border-gray-800 hover:dark:border-white hover:border-gray-900 dark:text-gray-500 text-gray-900 hover:dark:text-white hover:text-gray-900 dark:hover:bg-gray-800 hover:bg-gray-800 py-5"
                  >
                    <GoogleIcon />
                    <div className="mt-1 ms-2 dark:font-semibold text-[12px]">
                      ورود با اکانت گوگل
                    </div>
                  </Button>
                )}
              />
              <Inputs
                error={formErrors.staffCodeMeli}
                dir="rtl"
                label="کد ملی"
                type="number"
                value={staffCodeMeli}
                id="custom-css-outlined-input"
                onChange={(e) => {
                  //limit the input
                  let inputValue = e.target.value;
                  const maxLength = 10;
                  if (inputValue.length > maxLength) {
                    inputValue = inputValue.slice(0, maxLength);
                  }
                  dispatch(RsetStaffCodeMeli(inputValue));
                }}
              />
              <Inputs
                error={formErrors.staffPassword}
                label="رمز عبور"
                value={staffPassword}
                variant="outlined"
                color="warning"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {!showPassword ? (
                          <VisibilityOff
                            fontSize="small"
                            className="dark:text-gray-600 dark:hover:text-gray-400  text-gray-700 hover:text-gray-900"
                          />
                        ) : (
                          <Visibility
                            fontSize="small"
                            className="dark:text-gray-600 dark:hover:text-gray-400  text-gray-700 hover:text-gray-900"
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  dispatch(RsetStaffPassword(e.target.value));
                }}
              />
              <div>
                <p className="dark:text-blue-400 text-blue-700 dark:hover:text-blue-300 hover:text-blue-500 cursor-pointer text-[12px]">
                  فراموشی رمزعبور
                </p>
              </div>
              <Button
                variant="outlined"
                style={{ borderRadius: "15px" }}
                className="dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500"
                onClick={(e) => {
                  handleLogin(e);
                }}
              >
                ورود
              </Button>
            </div>
          </ThemeProvider>
        </CacheProvider>
      </div>
    </div>
  );
};

export default StaffLogin;
