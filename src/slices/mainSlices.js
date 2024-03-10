import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCompanies } from "../services/companiesServices";

const initialState = {
  user: {},
  loading: false,
  darkMode: false,
  showOffCanvas: false,
  formErrors: {},
  companiesList: [],
  currentOrder: {},
  //modals
  sentOrderModal: false,
  customerDetailModal: false,
  productDetailModal: false,
  //carDetail
  carDriverName: "",
  carPlate: "",
  carModel: "",
  sendCarBy: "",
  outputNo: "",
};

export const handleCompaniesList = createAsyncThunk(
  "main/handleCompaniesList",
  async (obj, { dispatch, getState }) => {
    try {
      const getCompaniesRes = await getCompanies();
      if (getCompaniesRes.data.companies) {
        dispatch(RsetCompaniesList(getCompaniesRes.data.companies));
      } else {
        console.log("error on companies API");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

const mainSlices = createSlice({
  name: "main",
  initialState,
  reducers: {
    RsetUser: (state, { payload }) => {
      return { ...state, user: payload };
    },
    RsetLoading: (state, { payload }) => {
      return { ...state, loading: payload };
    },
    RsetFormErrors: (state, { payload }) => {
      return { ...state, formErrors: payload };
    },
    RsetDarkMode: (state, { payload }) => {
      return { ...state, darkMode: payload };
    },
    RsetShowOffCanvas: (state, { payload }) => {
      return { ...state, showOffCanvas: payload };
    },
    RsetDarkMode: (state, { payload }) => {
      return { ...state, darkMode: payload };
    },
    RsetCompaniesList: (state, { payload }) => {
      return { ...state, companiesList: payload };
    },
    RsetCurrentOrder: (state, { payload }) => {
      return { ...state, currentOrder: payload };
    },
    RsetCarDriverName: (state, { payload }) => {
      return { ...state, carDriverName: payload };
    },
    RsetCarPlate: (state, { payload }) => {
      return { ...state, carPlate: payload };
    },
    RsetCarModel: (state, { payload }) => {
      return { ...state, carModel: payload };
    },
    RsetSendCarBy: (state, { payload }) => {
      return { ...state, sendCarBy: payload };
    },
    RsetOutputNo: (state, { payload }) => {
      return { ...state, outputNo: payload };
    },
    //modal
    RsetSentOrderModal: (state, { payload }) => {
      return { ...state, sentOrderModal: payload };
    },
    RsetCustomerDetailModal: (state, { payload }) => {
      return { ...state, customerDetailModal: payload };
    },
    RsetProductDetailModal: (state, { payload }) => {
      return { ...state, productDetailModal: payload };
    },
  },
});

export const {
  RsetUser,
  RsetDarkMode,
  RsetShowOffCanvas,
  RsetLoading,
  RsetFormErrors,
  RsetCompaniesList,
  RsetCurrentOrder,
  RsetCarDriverName,
  RsetCarPlate,
  RsetCarModel,
  RsetSendCarBy,
  RsetOutputNo,
  //modal
  RsetSentOrderModal,
  RsetCustomerDetailModal,
  RsetProductDetailModal,
} = mainSlices.actions;

export const selectUser = (state) => state.main.user;
export const selectLoading = (state) => state.main.loading;
export const selectFormErrors = (state) => state.main.formErrors;
export const selectDarkMode = (state) => state.main.darkMode;
export const selectShowOffCanvas = (state) => state.main.showOffCanvas;
export const selectCompaniesList = (state) => state.main.companiesList;
export const selectCurrentOrder = (state) => state.main.currentOrder;
export const selectCarDriverName = (state) => state.main.carDriverName;
export const selectCarPlate = (state) => state.main.carPlate;
export const selectCarModel = (state) => state.main.carModel;
export const selectSendCarBy = (state) => state.main.sendCarBy;
export const selectOutputNo = (state) => state.main.outputNo;
//modal
export const selectSentOrderModal = (state) => state.main.sentOrderModal;
export const selectCustomerDetailModal = (state) =>
  state.main.customerDetailModal;
export const selectProductDetailModal = (state) =>
  state.main.productDetailModal;

export default mainSlices.reducer;
