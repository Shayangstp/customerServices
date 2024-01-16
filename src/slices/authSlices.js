import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    RsetDriverPhoneNumber: (state, { payload }) => {
      return { ...state, driverPhoneNumber: payload };
    },
    RsetDriverRegisterCode: (state, { payload }) => {
      return { ...state, driverRegisterCode: payload };
    },
  },
});

export const { RsetDriverPhoneNumber, RsetDriverRegisterCode } =
  authSlices.actions;

export const selectDriverPhoneNumber = (state) => state.auth.driverPhoneNumber;
export const selectDriverRegisterCode = (state) =>
  state.auth.driverRegisterCode;

export default authSlices.reducer;
