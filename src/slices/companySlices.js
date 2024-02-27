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
    const user = getState().main.user;

    const values = {
      companyCode: companyCode,
      userID: user.UserId,
    };

    console.log(values);
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
          toPerson: "3",
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
          toPerson: "4",
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
          toPerson: "5",
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
          toPerson: "6",
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
          toPerson: "7",
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
          toPerson: "8",
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
