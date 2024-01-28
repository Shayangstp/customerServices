import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCompanies } from "../services/companiesServices";

const initialState = {
  user: {},
  loading: false,
  darkMode: false,
  showOffCanvas: false,
  formErrors: {},
  companiesList: [],
  companyCode: "",
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
      return { ...state, lodaing: payload };
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
    RsetCompanyCode: (state, { payload }) => {
      return { ...state, companyCode: payload };
    },
  },
});

export const {
  RsetUser,
  RsetDarkMode,
  RsetShowOffCanvas,
  RsetLoading,
  RsetFormErrors,
  RsetCompanyCode,
  RsetCompaniesList,
} = mainSlices.actions;

export const selectUser = (state) => state.main.user;
export const selectLoading = (state) => state.main.loading;
export const selectFormErrors = (state) => state.main.formErrors;
export const selectDarkMode = (state) => state.main.darkMode;
export const selectShowOffCanvas = (state) => state.main.showOffCanvas;
export const selectCompaniesList = (state) => state.main.companiesList;
export const selectCompanyCode = (state) => state.main.companyCode;

export default mainSlices.reducer;
