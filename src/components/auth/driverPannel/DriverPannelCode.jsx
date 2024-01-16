import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDriverRegisterCode,
  RsetDriverRegisterCode,
} from "../../../slices/authSlices";

const DriverPannelCode = () => {
  const dispatch = useDispatch();
  const driverRegisterCode = useSelector(selectDriverRegisterCode);
  //   const rtlTheme = createTheme({ direction: "rtl" });
  //auth and validation for the phone number
  return (
    <div className="flex  justify-center items-center min-h-[90vh]">
      <div className="justify-center items-center flex flex-col gap-10 bg-white p-16 rounded-2xl">
        <TextField
          id="phoneNumber"
          label="کد"
          variant="outlined"
          value={driverRegisterCode}
          onChange={(e) => {
            dispatch(RsetDriverRegisterCode(e.target.value));
          }}
        />
        <div className="flex gap-3">
          <Button
            variant="contained"
            className="text-black bg-green-400"
            onClick={() => {
              console.log("hi");
            }}
          >
            ثبت
          </Button>
          <Button variant="contained" className="text-black bg-red-400">
            انصراف
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DriverPannelCode;
