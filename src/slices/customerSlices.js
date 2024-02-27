import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  postCustomerOrders,
  postCustomerOrdersPerCompany,
} from "../services/customersServices";
import { RsetLoading } from "./mainSlices";

const initialState = {
  customerOrdersList: [],
  customerOdersListPerCompany: [],
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
  },
});

export const { RsetCustomerOrdersList, RsetCustomerOrdersListPerCompany } =
  customerSlices.actions;

export const selectCustomerOrdersList = (state) =>
  state.customer.customerOrdersList;
export const selectCustomerOrdersListPerCompany = (state) =>
  state.customer.customerOrdersListPerCompany;

export default customerSlices.reducer;
