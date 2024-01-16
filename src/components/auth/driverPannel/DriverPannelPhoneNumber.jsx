import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  RsetDriverPhoneNumber,
  selectDriverPhoneNumber,
} from "../../../slices/authSlices";
import { useNavigate } from "react-router-dom";

const DriverPannelPhoneNumber = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const driverPhoneNumber = useSelector(selectDriverPhoneNumber);
  return (
    <div className="flex  justify-center items-center min-h-[90vh]">
      <div className="justify-center items-center flex flex-col gap-10 bg-white p-16 rounded-2xl">
        <TextField
          id="phoneNumber"
          label="شماره تلفن"
          variant="outlined"
          value={driverPhoneNumber}
          onChange={(e) => {
            dispatch(RsetDriverPhoneNumber(e.target.value));
          }}
        />
        <div className="flex gap-3">
          <Button
            variant="contained"
            className="text-black bg-green-400"
            onClick={() => {
              console.log("hi");
              if (driverPhoneNumber !== "") {
                navigate("/driverPannelCode");
              }
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

export default DriverPannelPhoneNumber;
