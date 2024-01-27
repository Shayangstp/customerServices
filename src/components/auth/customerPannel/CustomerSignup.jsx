import React, { useEffect, useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GoogleLogin from "@leecheuk/react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch, useSelector } from "react-redux";
import { gapi } from "gapi-script";
import { successMessage, errorMessage } from "../../../utils/toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
//api
import { postCustomerSignUp } from "../../../services/authServices";
//slices
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";
import {
  RsetCustomerLogginPage,
  selectCustomerLoginPage,
} from "../../../slices/authSlices";
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

//inputs with styles

const CustomInput = styled("input")({
  "&::placeholder": {
    fontSize: "12px",
  },
});

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
    "& input[type=number]": {
      "-moz-appearance": "textfield",
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        display: "none",
        "-webkit-appearance": "none",
        margin: 0,
      },
      "&::placeholder": {
        color: "red", // Example: Change placeholder text color to gray
        fontStyle: "italic", // Example: Apply italic style to placeholder text
      },
    },
  },
});

//rtl

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "iranSans, Arial, sans-serif", // Change the font family as desired
  },
});

const CustomerSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  //selcet
  const customerLogginPage = useSelector(selectCustomerLoginPage);
  const customerCodeMeli = useSelector(selectCustomerCodeMeli);
  const customerFullName = useSelector(selectCustomerFullName);
  const customerPhoneNumber = useSelector(selectCustomerPhoneNumber);
  const customerPassword = useSelector(selectCustomerPassword);
  const formErrors = useSelector(selectFormErrors);

  // validation
  const customerCodeMeliIsValid = customerCodeMeli.length === 10;
  const customerFullNameIsValid = customerFullName !== "";
  const customerPhoneNumberIsValid =
    customerPhoneNumber !== "" && /^0\d{10}$/.test(customerPhoneNumber);
  const customerPasswordIsValid =
    customerPassword && customerPassword.length >= 5;

  const formIsValid =
    customerCodeMeliIsValid &&
    customerFullNameIsValid &&
    customerPhoneNumberIsValid &&
    customerPasswordIsValid;

  const validation = () => {
    var errors = {};
    if (!customerCodeMeliIsValid) {
      errors.customerCodeMeli = true;
    }
    if (!customerFullNameIsValid) {
      errors.customerFullName = true;
    }
    if (!customerPhoneNumberIsValid) {
      errors.customerPhoneNumber = true;
    }
    if (!customerPasswordIsValid) {
      errors.customerPassword = true;
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

  //handle signup

  const handleCustomerSignUp = async (e) => {
    e.preventDefault();

    if (formIsValid) {
      const values = {
        codeMeli: customerCodeMeli,
        fullName: customerFullName,
        phoneNumber: customerPhoneNumber,
        password: customerPassword,
      };

      console.log(values);

      const postCustomerSignUpRes = await postCustomerSignUp(values);

      console.log(postCustomerSignUpRes);
      if (postCustomerSignUpRes.data.code === 201) {
        successMessage(postCustomerSignUpRes.data.message);
      } else {
        errorMessage(postCustomerSignUpRes.data.message);
      }
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            customerCodeMeli,
            customerFullName,
            customerPhoneNumber,
            customerPassword,
          })
        )
      );
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
        error={formErrors.customerCodeMeli}
        dir="rtl"
        type="number"
        label="کد ملی"
        value={customerCodeMeli}
        onChange={(e) => {
          //handle the limitation
          let inputValue = e.target.value;
          const maxLength = 10;
          if (inputValue.length > maxLength) {
            inputValue = inputValue.slice(0, maxLength);
          }
          dispatch(RsetCustomerCodeMeli(inputValue));
        }}
      />
      <Inputs
        error={formErrors.customerFullName}
        dir="rtl"
        label="نام و نام خانوادگی"
        value={customerFullName}
        onChange={(e) => {
          dispatch(RsetCustomerFullName(e.target.value));
        }}
      />
      <Inputs
        error={formErrors.customerPhoneNumber}
        dir="rtl"
        type="number"
        label="شماره موبایل"
        value={customerPhoneNumber}
        onChange={(e) => {
          //handle limitation
          let inputValue = e.target.value;
          const maxLength = 11;
          if (inputValue.length > maxLength) {
            inputValue = inputValue.slice(0, maxLength);
          }
          dispatch(RsetCustomerPhoneNumber(inputValue));
        }}
        inputProps={{
          maxLength: 10,
        }}
      />
      <Inputs
        error={formErrors.customerPassword}
        value={customerPassword}
        label="رمز عبور"
        variant="outlined"
        placeholder="رمز عبور باید بیشتر از 5 کراکتر باشد"
        color="warning"
        type={showPassword ? "text" : "password"}
        InputProps={{
          inputComponent: CustomInput,
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
          dispatch(RsetCustomerPassword(e.target.value));
        }}
      />
      {customerPassword && customerPassword.length < 5 && (
        <p className="text-red-500 text-[10px]">
          رمز عبور باید بیشتر از 5 کراکتر باشد
        </p>
      )}
      <div>
        <p className="text-[12px]">
          <span className="text-gray-400">اکانت دارید؟</span>
          <span
            className="cursor-pointer dark:text-blue-400 hover:dark:text-blue-300 ms-2"
            onClick={() => {
              dispatch(RsetCustomerLogginPage(true));
              //reset form
              dispatch(RsetCustomerCodeMeli(""));
              dispatch(RsetCustomerFullName(""));
              dispatch(RsetCustomerPhoneNumber(""));
              dispatch(RsetCustomerPassword(""));
              dispatch(RsetFormErrors({}));
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
