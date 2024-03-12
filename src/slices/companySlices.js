import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getCompanies, postActionsOrder } from "../services/companiesServices";
import { postCompaniesOrders } from "../services/companiesServices";
import { RsetLoading, RsetTotalOrder } from "./mainSlices";
import { errorMessage, successMessage } from "../utils/toast";

const initialState = {
  companyOrdersList: [],
  currentOrder: {},
  companyOrderListReloader: false,
  companyCode: "",
  companySendCarDate: null,
  companyListPageSize: "",
  companyListPageNumber: "",
  //modals
  companyAcceptModal: false,
};

export const handleCompaniesOrdersList = createAsyncThunk(
  "company/handleCampaniesOrdersList",
  async (obj, { dispatch, getState }) => {
    dispatch(RsetLoading(true));
    const companyCode = getState().company.companyCode;
    const user = getState().main.user;
    const pageNumber = getState().company.companyListPageNumber;
    const pageSize = getState().company.companyListPageSize;

    const values = {
      companyCode: Number(companyCode),
      userId: user._id,
    };
    console.log(values);
    const paramsValues = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    try {
      const postCompaniesOrdersRes = await postCompaniesOrders(
        values,
        paramsValues
      );
      console.log(postCompaniesOrdersRes);
      if (postCompaniesOrdersRes.data.code === 200) {
        dispatch(
          RsetCompanyOrdersList(postCompaniesOrdersRes.data.companyOrders)
        );
        dispatch(RsetTotalOrder(postCompaniesOrdersRes.data.totalOrders));

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
    const currentOrder = getState().main.currentOrder;
    const userIp = getState().auth.userIp;
    const user = getState().main.user;
    try {
      let values = {};

      // make all the toperson === userId
      if (currentOrder.LastActionCode === 1) {
        values = {
          orderNo: currentOrder.OrderNo,
          userId: user._id,
          ipAddress: "userIp",
          actionCode: 2,
          comment: "تایید چیدمان بار",
          toPerson: "6360ecd63ba4d4828c9cd71f",
        };
      } else if (currentOrder.LastActionCode === 2) {
        values = {
          companyCode: currentOrder.CompanyCode,
          exports: currentOrder.Export,
          orderNo: currentOrder.OrderNo,
          userId: user._id,
          ipAddress: "userIp",
          actionCode: 3,
          comments: "تایید آماده بارگیری",
          toPerson: "6360ecd53ba4d4828c9cd1f5",
        };
      } else if (currentOrder.LastActionCode === 3) {
        values = {
          companyCode: currentOrder.CompanyCode,
          exports: currentOrder.Export,
          orderNo: currentOrder.OrderNo,
          userId: user._id,
          ipAddress: userIp,
          actionCode: 4,
          comments: "تایید رسیدن ماشین",
          toPerson: "6434f84d89828a92a92181c4",
        };
      } else if (currentOrder.LastActionCode === 4) {
        values = {
          companyCode: currentOrder.CompanyCode,
          exports: currentOrder.Export,
          orderNo: currentOrder.OrderNo,
          userId: user._id,
          ipAddress: "userIp",
          actionCode: 5,
          comments: "تایید درحال بارگیری",
          toPerson: "6360ecd63ba4d4828c9cd71f",
        };
      } else if (currentOrder.LastActionCode === 5) {
        values = {
          companyCode: currentOrder.CompanyCode,
          exports: currentOrder.Export,
          orderNo: currentOrder.OrderNo,
          userId: user._id,
          ipAddress: "userIp",
          actionCode: 6,
          comments: "تایید ترخیص شده",
          toPerson: "6360ecd53ba4d4828c9cd1f5",
        };
      } else if (currentOrder.LastActionCode === 6) {
        values = {
          companyCode: currentOrder.CompanyCode,
          exports: currentOrder.Export,
          orderNo: currentOrder.OrderNo,
          userId: user._id,
          ipAddress: "userIp",
          actionCode: 7,
          comments: "تایید تحویل شده",
          toPerson: "8",
        };
      }

      console.log(values);
      const postActionsOrderRes = await postActionsOrder(values);
      console.log(postActionsOrderRes);
      if (postActionsOrderRes.data.code === 200) {
        successMessage("عملیات با موفقیت انجام شد");
      } else {
        errorMessage("خطا");
      }
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
    RsetCompanyCode: (state, { payload }) => {
      return { ...state, companyCode: payload };
    },
    RsetCompanySendCarDate: (state, { payload }) => {
      return { ...state, companySendCarDate: payload };
    },
    RsetCompanyListPageNumber: (state, { payload }) => {
      return { ...state, companyListPageNumber: payload };
    },
    RsetCompanyListPageSize: (state, { payload }) => {
      return { ...state, companyListPageSize: payload };
    },
    //accept modal
    RsetCompanyAcceptModal: (state, { payload }) => {
      return { ...state, companyAcceptModal: payload };
    },
  },
});

export const {
  RsetCompanyOrdersList,
  RsetCurrentOrder,
  RsetCompanyOrderListReloader,
  RsetCompanyCode,
  RsetCompanySendCarDate,
  RsetCompanyListPageNumber,
  RsetCompanyListPageSize,
  //modal
  RsetCompanyAcceptModal,
  RsetCompanyOrderLastAction,
} = companySlices.actions;

export const selectCompanyOrdersList = (state) =>
  state.company.companyOrdersList;
export const selectCurrentOrder = (state) => state.company.currentOrder;
export const selectCompanyOrderListReloader = (state) =>
  state.company.companyOrderListReloader;
export const selectCompanyCode = (state) => state.company.companyCode;
export const selectCompanySendCarDate = (state) =>
  state.company.companySendCarDate;
export const selectCompanyListPageNumber = (state) =>
  state.company.companyListPageNumber;
export const selectCompanyListPageSize = (state) =>
  state.company.companyListPageSize;

//modal
export const selectCompanyAcceptModal = (state) =>
  state.company.companyAcceptModal;

export default companySlices.reducer;
