import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  postCustomerOrders,
  postCustomerOrdersPerCompany,
} from "../services/customersServices";
import { RsetLoading } from "./mainSlices";

const initialState = {
  customerOrdersList: [],
  customerOdersListPerCompany: [],
  customerCarPalte: "",
  customerCarModel: "",
  customerCarDriverName: "",
  //modal
  customerCarDetailModal: false,
};

export const handleCustomerOrderList = createAsyncThunk(
  "main/handleCustomerOrderList",
  async (obj, { dispatch, getState }) => {
    const values = {
      customerCode: 40114,
    };
    try {
      const postCustomerOrdersRes = await postCustomerOrders(values);
      if (postCustomerOrdersRes.data.code === 200) {
        dispatch(
          RsetCustomerOrdersList(postCustomerOrdersRes.data.customerOrders)
        );
      } else {
        console.log("error on postCustomerOrdersRes API");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

//this do the above function too
export const handleCustomerOrderPerCompany = createAsyncThunk(
  "main/handleCustomerOrderPerCompany",
  async (obj, { dispatch, getState }) => {
    dispatch(RsetLoading(true));
    const companyCode = getState().company.companyCode;
    const values = {
      customerCode: 40114,
      companyCode: String(companyCode),
    };
    console.log(values);
    try {
      const postCustomerOrdersPerCompanyRes =
        await postCustomerOrdersPerCompany(values);
      console.log(postCustomerOrdersPerCompanyRes);
      if (postCustomerOrdersPerCompanyRes.data.customerOrdersPerCompany) {
        dispatch(
          RsetCustomerOrdersListPerCompany(
            postCustomerOrdersPerCompanyRes.data.customerOrdersPerCompany
          )
        );
        dispatch(RsetLoading(false));
      } else {
        console.log("error on postCustomerOrdersPerCompanyRes API");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

const customerSlices = createSlice({
  name: "customer",
  initialState,
  reducers: {
    RsetCustomerOrdersList: (state, { payload }) => {
      return { ...state, customerOrdersList: payload };
    },
    RsetCustomerOrdersListPerCompany: (state, { payload }) => {
      return { ...state, customerOrdersListPerCompany: payload };
    },
    RsetCustomerCarPlate: (state, { payload }) => {
      return { ...state, customerCarPlate: payload };
    },
    RsetCustomerCarModel: (state, { payload }) => {
      return { ...state, customerCarModel: payload };
    },
    RsetCustomerCarDriverName: (state, { payload }) => {
      return { ...state, customerCarDriverName: payload };
    },
    //modals
    RsetCustomerCarDetailModal: (state, { payload }) => {
      return { ...state, customerCarDetailModal: payload };
    },
  },
});

export const {
  RsetCustomerOrdersList,
  RsetCustomerOrdersListPerCompany,
  RsetCustomerCarDetailModal,
  RsetCustomerCarPlate,
  RsetCustomerCarModel,
  RsetCustomerCarDriverName,
} = customerSlices.actions;

export const selectCustomerOrdersList = (state) =>
  state.customer.customerOrdersList;
export const selectCustomerOrdersListPerCompany = (state) =>
  state.customer.customerOrdersListPerCompany;
export const selectCustomerCarPlate = (state) =>
  state.customer.customerCarPlate;
export const selectCustomerCarModel = (state) =>
  state.customer.customerCarModel;
export const selectCustomerCarDriverName = (state) =>
  state.customer.customerCarDriverName;
//modal
export const selectCustomerCarDetailModal = (state) =>
  state.customer.customerCarDetailModal;

export default customerSlices.reducer;
