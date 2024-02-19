import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getCompanies, postActionsOrder } from "../services/companiesServices";
import { postCompaniesOrders } from "../services/companyServices";
import { RsetLoading } from "./mainSlices";

const initialState = {
  companyOrdersList: [],
  currentOrder: {},
  companyOrderListReloader: false,
  companyCode: "",
  //modals
  companyAcceptModal: false,
};

export const handleCompaniesOrdersList = createAsyncThunk(
  "company/handleCampaniesOrdersList",
  async (obj, { dispatch, getState }) => {
    dispatch(RsetLoading(true));
    const companyCode = getState().company.companyCode;
    const values = {
      companyCode: companyCode,
      userRole: "",
    };

    try {
      const postCompaniesOrdersRes = await postCompaniesOrders(values);
      console.log(postCompaniesOrdersRes);
      if (postCompaniesOrdersRes.data.code === 200) {
        dispatch(
          RsetCompanyOrdersList(postCompaniesOrdersRes.data.companyOrders)
        );
        dispatch(RsetLoading(false));
      } else {
        console.log("error on postCompaniesOrdersRes API");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const handleCompanyOrderActions = createAsyncThunk(
  "company/handleCompanyOrderActions",
  async (obj, { dispatch, getState }) => {
    const currentOrder = getState().company.currentOrder;
    const userIp = getState().auth.userIp;
    try {
      let values = {};

      if (currentOrder.latestActionCode === 1) {
        values = {
          companyCode: currentOrder.CompanyCode,
          exports: currentOrder.Export,
          orderNo: currentOrder.OrderNo,
          userName: "system",
          ipAddress: userIp,
          actionCode: 2,
          comments: "تایید چیدمان بار",
        };
      } else if (currentOrder.latestActionCode === 2) {
        values = {
          companyCode: currentOrder.CompanyCode,
          exports: currentOrder.Export,
          orderNo: currentOrder.OrderNo,
          userName: "system",
          ipAddress: userIp,
          actionCode: 3,
          comments: "تایید آماده بارگیری",
        };
      } else if (currentOrder.latestActionCode === 3) {
        values = {
          companyCode: currentOrder.CompanyCode,
          exports: currentOrder.Export,
          orderNo: currentOrder.OrderNo,
          userName: "system",
          ipAddress: userIp,
          actionCode: 4,
          comments: "تایید رسیدن ماشین",
        };
      } else if (currentOrder.latestActionCode === 4) {
        values = {
          companyCode: currentOrder.CompanyCode,
          exports: currentOrder.Export,
          orderNo: currentOrder.OrderNo,
          userName: "system",
          ipAddress: userIp,
          actionCode: 5,
          comments: "تایید درحال بارگیری",
        };
      } else if (currentOrder.latestActionCode === 5) {
        values = {
          companyCode: currentOrder.CompanyCode,
          exports: currentOrder.Export,
          orderNo: currentOrder.OrderNo,
          userName: "system",
          ipAddress: userIp,
          actionCode: 6,
          comments: "تایید ترخیص شده",
        };
      } else if (currentOrder.latestActionCode === 6) {
        values = {
          companyCode: currentOrder.CompanyCode,
          exports: currentOrder.Export,
          orderNo: currentOrder.OrderNo,
          userName: "system",
          ipAddress: userIp,
          actionCode: 7,
          comments: "تایید تحویل شده",
        };
      }

      const postActionsOrderRes = await postActionsOrder(values);
      console.log(postActionsOrderRes);
    } catch (ex) {
      console.log(ex);
    }
  }
);

const companySlices = createSlice({
  name: "company",
  initialState,
  reducers: {
    RsetCompanyOrdersList: (state, { payload }) => {
      return { ...state, companyOrdersList: payload };
    },
    RsetCurrentOrder: (state, { payload }) => {
      return { ...state, currentOrder: payload };
    },
    RsetCompanyOrderListReloader: (state, { payload }) => {
      return { ...state, companyOrderListReloader: payload };
    },
    //accept modal
    RsetCompanyAcceptModal: (state, { payload }) => {
      return { ...state, companyAcceptModal: payload };
    },
    RsetCompanyCode: (state, { payload }) => {
      return { ...state, companyCode: payload };
    },
  },
});

export const {
  RsetCompanyOrdersList,
  RsetCurrentOrder,
  RsetCompanyOrderListReloader,
  RsetCompanyCode,
  //modal
  RsetCompanyAcceptModal,
} = companySlices.actions;

export const selectCompanyOrdersList = (state) =>
  state.company.companyOrdersList;
export const selectCurrentOrder = (state) => state.company.currentOrder;
export const selectCompanyOrderListReloader = (state) =>
  state.company.companyOrderListReloader;
export const selectCompanyCode = (state) => state.company.companyCode;
//modal
export const selectCompanyAcceptModal = (state) =>
  state.company.companyAcceptModal;

export default companySlices.reducer;
