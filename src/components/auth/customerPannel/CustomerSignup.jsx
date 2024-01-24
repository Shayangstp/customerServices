import React, { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material";
import { prefixer } from "stylis";
import GoogleLogin from "@leecheuk/react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetCustomerLogginPage,
  selectCustomerLoginPage,
} from "../../../slices/authSlices";
import { gapi } from "gapi-script";
//slices
import {
  RsetCustomerCodeMeli,
  selectCustomerCodeMeli,
  RsetCustomerFullName,
  selectCustomerFullName,
  RsetCustomerPhoneNumber,
  selectCustomerPhoneNumber,
  RsetCustomerPassword,
  selectCustomerPassword,
} from "../../../slices/authSlices";
import { postCustomerSignUp } from "../../../services/authServices";

//rtl
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

const CustomerSignup = () => {
  const dispatch = useDispatch();
  //selcet
  const customerLogginPage = useSelector(selectCustomerLoginPage);
  const customerCodeMeli = useSelector(selectCustomerCodeMeli);
  const customerFullName = useSelector(selectCustomerFullName);
  const customerPhoneNumber = useSelector(selectCustomerPhoneNumber);
  const customerPassword = useSelector(selectCustomerPassword);
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

  //handle signup

  const handleCustomerSignUp = async (e) => {
    e.preventDefault();

    const values = {
      codeMeli: customerCodeMeli,
      fullName: customerFullName,
      phoneNumber: customerPhoneNumber,
      password: customerPassword,
    };

    console.log(values);

    const postCustomerSignUpRes = await postCustomerSignUp(values);

    console.log(postCustomerSignUpRes);
    if (postCustomerSignUpRes.data.code === 200) {
      
    }
  };

  return (
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
            className="border dark:border-gray-600 hover:dark:border-white dark:text-gray-500 hover:dark:text-white dark:hover:bg-gray-800 py-5"
          >
            <GoogleIcon />
            <div className="mt-1 ms-2 dark:font-semibold text-[12px]">
              ثبت نام با اکانت گوگل
            </div>
          </Button>
        )}
      />
      <Inputs
        dir="rtl"
        type="number"
        label="کد ملی"
        id="custom-css-outlined-input"
        onChange={(e) => {
          dispatch(RsetCustomerCodeMeli(e.target.value));
        }}
      />
      <Inputs
        dir="rtl"
        label="نام و نام خانوادگی"
        id="custom-css-outlined-input"
        onChange={(e) => {
          dispatch(RsetCustomerFullName(e.target.value));
        }}
      />
      <Inputs
        dir="rtl"
        label="شماره موبایل"
        id="custom-css-outlined-input"
        onChange={(e) => {
          dispatch(RsetCustomerPhoneNumber(e.target.value));
        }}
      />
      <Inputs
        label="رمز عبور"
        variant="outlined"
        color="warning"
        type="password"
        onChange={(e) => {
          dispatch(RsetCustomerPassword(e.target.value));
        }}
      />
      <div>
        <p className="text-[12px]">
          <span className="text-gray-400">اکانت دارید؟</span>
          <span
            className="cursor-pointer dark:text-blue-400 hover:dark:text-blue-300 ms-2"
            onClick={() => {
              dispatch(RsetCustomerLogginPage(true));
            }}
          >
            ورود کنید.
          </span>
        </p>
      </div>
      <Button
        variant="outlined"
        style={{ borderRadius: "15px" }}
        className="dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500"
        onClick={(e) => {
          handleCustomerSignUp(e);
        }}
      >
        ثبت نام
      </Button>
    </div>
  );
};

export default CustomerSignup;
