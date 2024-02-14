import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCompanies } from "../services/companiesServices";

const initialState = {
  companyOrdersList: [],
};

// export const handleCompaniesList = createAsyncThunk(
//   "main/handleCompaniesList",
//   async (obj, { dispatch, getState }) => {
//     try {
//       const getCompaniesRes = await getCompanies();
//       if (getCompaniesRes.data.companies) {
//         dispatch(RsetCompaniesList(getCompaniesRes.data.companies));
//       } else {
//         console.log("error on companies API");
//       }
//     } catch (ex) {
//       console.log(ex);
//     }
//   }
// );

const companySlices = createSlice({
  name: "company",
  initialState,
  reducers: {
    RsetCompanyOrdersList: (state, { payload }) => {
      return { ...state, companyOrdersList: payload };
    },
  },
});

export const { RsetCompanyOrdersList } = companySlices.actions;

export const selectCompanyOrdersList = (state) =>
  state.company.companyOrdersList;

export default companySlices.reducer;
