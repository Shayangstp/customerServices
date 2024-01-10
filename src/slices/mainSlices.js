import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
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
    RsetDarkMode: (state, { payload }) => {
      return { ...state, darkMode: payload };
    },
  },
});

export const { RsetDarkMode } = mainSlices.actions;

export const selectDarkMode = (state) => state.main.darkMode;

export default mainSlices.reducer;
