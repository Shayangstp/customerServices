import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  darkMode: false,
  formErrors: {},
  data: [],
  column: [],
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

const mainSlices = createSlice({
  name: "main",
  initialState,
  reducers: {
    RsetLoading: (state, { payload }) => {
      return { ...state, lodaing: payload };
    },
    RsetFormErrors: (state, { payload }) => {
      return { ...state, formErrors: payload };
    },
    RsetDarkMode: (state, { payload }) => {
      return { ...state, darkMode: payload };
    },
    RsetDarkMode: (state, { payload }) => {
      return { ...state, darkMode: payload };
    },
  },
});

export const { RsetDarkMode, RsetLoading, RsetFormErrors } = mainSlices.actions;

export const selectLoading = (state) => state.main.loading;
export const selectFormErrors = (state) => state.main.formErrors;
export const selectDarkMode = (state) => state.main.darkMode;

export default mainSlices.reducer;
