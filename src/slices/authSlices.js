import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

// export const handleCommonUserList = createAsyncThunk(
//     "main/handleCommonUserList",
//     async (obj, { dispatch, getState }) => {
//       // const { allGpeses } = getState().main;
//       const token = localStorage.getItem("token");

//       try {
//         const getCommonUserRes = await getCommonUser(token);
//         console.log(getCommonUserRes);
//         // if()
//         dispatch(RsetCategoryCommonUserOptions(getCommonUserRes.data.allUser))
//       } catch (ex) {
//         console.log(ex);
//       }
//     }
//   );

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
