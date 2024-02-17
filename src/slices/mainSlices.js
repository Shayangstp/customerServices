import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCompanies } from "../services/companiesServices";

const initialState = {
  user: {},
  loading: false,
  darkMode: false,
  showOffCanvas: false,
  formErrors: {},
  companiesList: [],
  //modals
  sentOrderModal: false,
  customerDetailModal: false,
  productDetailModal: false,
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
//modal
export const selectSentOrderModal = (state) => state.main.sentOrderModal;
export const selectCustomerDetailModal = (state) =>
  state.main.customerDetailModal;
export const selectProductDetailModal = (state) =>
  state.main.productDetailModal;

export default mainSlices.reducer;
