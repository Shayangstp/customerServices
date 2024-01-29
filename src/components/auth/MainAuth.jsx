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
import { Button } from "antd";

const MainAuth = () => {
  const customerPannel = useSelector(selectCustomerPannel);
  const driverPannel = useSelector(selectDriverPannel);
  const staffPannel = useSelector(selectStaffPannel);
  return (
    <div className="h-[100vh] max-w-[100vw] flex justify-center items-center">
      <div className="dark:bg-gray-800 bg-gray-200 rounded-2xl dark:bg-opacity-20 xl:h-[80%] w-[80%] flex xl:flex-row flex-col">
        <div className="xl:w-[30%] w-[100%] xl:border-l border-b xl:border-b-0 p-3 xl:p-0 dark:border-gray-700 border-white rounded-2xl dark:bg-black bg-gray-100 bg-opacity-30 col-span-2 position-relative">
          <LoginSelect className="position-absolute" />
        </div>
        <div className="xl:w-[70%] w-[100%] flex justify-center items-center">
          {customerPannel && <CustomerLogin />}
          {staffPannel && <StaffLogin />}
          {driverPannel && <DriverLogin />}
        </div>
      </div>
    </div>
  );
};

export default MainAuth;
