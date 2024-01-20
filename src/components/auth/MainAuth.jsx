import React from "react";
import LoginSelect from "./LoginSelect";
import CustomerLogin from "./customerPannel/CustomerLogin";
import {
  selectCustomerPannel,
  selectDriverPannel,
  selectStaffPannel,
} from "../../slices/authSlices";
import { useSelector, useDispatch } from "react-redux";
import StaffLogin from "./staffPannel/StaffLogin";
import DriverLogin from "./driverPannel/DriverLogin";

const MainAuth = () => {
  const customerPannel = useSelector(selectCustomerPannel);
  const driverPannel = useSelector(selectDriverPannel);
  const staffPannel = useSelector(selectStaffPannel);
  return (
    <div className="h-[100vh] max-w-[100vw] flex justify-center items-center">
      <div className="bg-gray-800 rounded-2xl bg-opacity-20 h-[80%] w-[80%] grid grid-cols-6">
        <div className="border-l border-gray-700 rounded-2xl bg-black bg-opacity-30 col-span-2 flex items-center justify-center">
          <LoginSelect />
        </div>
        <div className="col-span-4 flex justify-center items-center">
          {customerPannel && <CustomerLogin />}
          {staffPannel && <StaffLogin />}
          {driverPannel && <DriverLogin />}
        </div>
      </div>
    </div>
  );
};

export default MainAuth;
