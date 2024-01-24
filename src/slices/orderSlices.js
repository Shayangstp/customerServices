import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  factoryList: [],
  detailList: [],
  selectedFactory: [],
  
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

const orderSlices = createSlice({
  name: "order",
  initialState,
  reducers: {
    RsetFactoryList: (state, { payload }) => {
      return { ...state, factoryList: payload };
    },
    RsetDetailList: (state, { payload }) => {
      return { ...state, detailList: payload };
    },
    RsetSelectedFactory: (state, { payload }) => {
      return { ...state, selectedFactory: payload };
    },
  },
});

export const { RsetFactoryList, RsetDetailList, RsetSelectedFactory } =
  orderSlices.actions;

export const selectFactoryList = (state) => state.order.factoryList;
export const selectDetailList = (state) => state.order.detailList;
export const selectSelectedFactory = (state) => state.order.selectedFactory;

export default orderSlices.reducer;
