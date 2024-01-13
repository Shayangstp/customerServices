import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  sentOrderModal: false,
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

const modalsSlices = createSlice({
  name: "modals",
  initialState,
  reducers: {
    RsetSentOrderModal: (state, { payload }) => {
      return { ...state, sentOrderModal: payload };
    },
  },
});

export const { RsetSentOrderModal } = modalsSlices.actions;

export const selectSentOrderModal = (state) => state.modals.sentOrderModal;

export default modalsSlices.reducer;
