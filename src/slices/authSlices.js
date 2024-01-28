import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginStaff, postCustomerLogin } from "../services/authServices";
import { RsetFormErrors, RsetUser } from "./mainSlices";
import { errorMessage, successMessage } from "../utils/toast";

const initialState = {
  customerPannel: true,
  driverPannel: false,
  staffPannel: false,
  customerLogginPage: true,
  isLoggedIn: false,
  //customer
  customerFullName: "",
  CustomerPassword: "",
  customerPhoneNumber: "",
  customerCodeMeli: "",
  //staff
  staffCodeMeli: "",
  staffPassword: "",
  //driver
  driverPhoneNumber: "",
  driverRegisterCode: "",
};

export const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export const handleStaffLogin = createAsyncThunk(
  "main/handleStaffLogin",
  async (obj, { dispatch, getState }) => {
    const { staffCodeMeli, staffPassword } = getState().auth;
    const user = {
      username: staffCodeMeli,
      password: staffPassword,
    };
    try {
      const loginStaffRes = await loginStaff(user);
      console.log(loginStaffRes);
      if (loginStaffRes.data.code === 415) {
        const userInfo = parseJwt(loginStaffRes.data.token);
        dispatch(RsetUser(userInfo));
        dispatch(RsetIsLoggedIn(true));
        localStorage.setItem("token", loginStaffRes.data.token);
        dispatch(RsetStaffCodeMeli(""));
        dispatch(RsetStaffPassword(""));
        dispatch(RsetFormErrors(""));
        successMessage("ورود با موفقیت انجام شد");
      } else {
        errorMessage("کد ملی یا رمز عبور اشتباه است!");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);
export const handleCustomerLogin = createAsyncThunk(
  "main/handleCustomerLogin",
  async (obj, { dispatch, getState }) => {
    const { customerCodeMeli, customerPassword } = getState().auth;
    const user = {
      codeMeli: customerCodeMeli,
      password: customerPassword,
    };
    try {
      const postCustomerLoginRes = await postCustomerLogin(user);
      console.log(postCustomerLoginRes);
      if (postCustomerLoginRes.data.code === 415) {
        const userInfo = parseJwt(postCustomerLoginRes.data.token);
        dispatch(RsetUser(userInfo));
        localStorage.setItem("token", postCustomerLoginRes.data.token);
        dispatch(RsetIsLoggedIn(true));
        dispatch(RsetCustomerCodeMeli(""));
        dispatch(RsetCustomerPassword(""));
        dispatch(RsetFormErrors({}));
        successMessage(postCustomerLoginRes.data.message);
      } else {
        errorMessage(postCustomerLoginRes.data.message);
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RsetCustomerLogginPage: (state, { payload }) => {
      return { ...state, customerLogginPage: payload };
    },
    RsetCustomerPannel: (state, { payload }) => {
      return { ...state, customerPannel: payload };
    },
    RsetDriverPannel: (state, { payload }) => {
      return { ...state, driverPannel: payload };
    },
    RsetStaffPannel: (state, { payload }) => {
      return { ...state, staffPannel: payload };
    },
    RsetIsLoggedIn: (state, { payload }) => {
      return { ...state, isLoggedIn: payload };
    },
    //customer
    RsetCustomerFullName: (state, { payload }) => {
      return { ...state, customerFullName: payload };
    },
    RsetCustomerPassword: (state, { payload }) => {
      return { ...state, customerPassword: payload };
    },
    RsetCustomerPhoneNumber: (state, { payload }) => {
      return { ...state, customerPhoneNumber: payload };
    },
    RsetCustomerCodeMeli: (state, { payload }) => {
      return { ...state, customerCodeMeli: payload };
    },
    //staff
    RsetStaffCodeMeli: (state, { payload }) => {
      return { ...state, staffCodeMeli: payload };
    },
    RsetStaffPassword: (state, { payload }) => {
      return { ...state, staffPassword: payload };
    },
    //driver
    RsetDriverPhoneNumber: (state, { payload }) => {
      return { ...state, driverPhoneNumber: payload };
    },
    RsetDriverRegisterCode: (state, { payload }) => {
      return { ...state, driverRegisterCode: payload };
    },
  },
});

export const {
  RsetCustomerLogginPage,
  RsetCustomerPannel,
  RsetDriverPannel,
  RsetStaffPannel,
  RsetIsLoggedIn,
  RsetCustomerFullName,
  RsetCustomerPassword,
  RsetCustomerPhoneNumber,
  RsetCustomerCodeMeli,
  RsetStaffCodeMeli,
  RsetStaffPassword,
  RsetDriverPhoneNumber,
  RsetDriverRegisterCode,
} = authSlices.actions;

export const selectCustomerPannel = (state) => state.auth.customerPannel;
export const selectDriverPannel = (state) => state.auth.driverPannel;
export const selectStaffPannel = (state) => state.auth.staffPannel;
export const selectCustomerLoginPage = (state) => state.auth.customerLogginPage;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
//customer
export const selectCustomerFullName = (state) => state.auth.customerFullName;
export const selectCustomerPassword = (state) => state.auth.customerPassword;
export const selectCustomerPhoneNumber = (state) =>
  state.auth.customerPhoneNumber;
export const selectCustomerCodeMeli = (state) => state.auth.customerCodeMeli;
//staff
export const selectStaffCodeMeli = (state) => state.auth.staffCodeMeli;
export const selectStaffPassword = (state) => state.auth.staffPassword;
//driver
export const selectDriverPhoneNumber = (state) => state.auth.driverPhoneNumber;
export const selectDriverRegisterCode = (state) =>
  state.auth.driverRegisterCode;

export default authSlices.reducer;
