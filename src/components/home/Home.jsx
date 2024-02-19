import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RsetIsLoggedIn } from "../../slices/authSlices";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../slices/mainSlices";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ListIcon from "@mui/icons-material/List";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Calender from "../common/Calender";
import { BasicPie, BasicLineChart } from "../common/chart";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const dashBoardButtons = [
  {
    title: "مانده حساب من",
    href: "finance",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    title: "عملکرد حساب من",
    href: "finance",
    icon: <RequestQuoteIcon />,
  },
  {
    title: "وضعیت چک ها",
    href: "checkStatus",
    icon: <ReceiptIcon />,
  },
  {
    title: "وضعیت واریزی ها",
    href: "depositsStatus",
    icon: <LibraryAddIcon />,
  },
  {
    title: "لیست سفارشات من",
    href: "customerOrdersList",
    icon: <ListIcon />,
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //select
  const user = useSelector(selectUser);
  //fake auth
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(RsetIsLoggedIn(true));
    } else {
      dispatch(RsetIsLoggedIn(false));
    }
  }, [token]);
  //end of fake auth


  return (
    <div className="min-h-[80vh] flex flex-col gap-10 justify-center items-center bg-transparent">
      <h1 className="lg:text-[50px] text-[30px] font-bold dark:text-gray-200 text-black mt-5">
        {user.fullName} عزیز خوش آمدید
      </h1>
      <div id="buttons" className="flex gap-3">
        {dashBoardButtons.map((item, idx) => {
          return (
            <Button
              variant="outlined"
              className="hover:dark:bg-gray-800 dark:border-gray-500 hover:dark:border-white dark:text-gray-300 hover:dark:text-gray-100 py-3"
              onClick={() => {
                navigate(`/${item.href}`);
              }}
            >
              <span className="me-2">{item.icon}</span>
              {item.title}
            </Button>
          );
        })}
      </div>
      <div className="flex gap-2 shadow-lg">
        <Calender />
        <div
          dir="rtl"
          className="border border-gray-500 rounded-2xl text-white flex flex-col justify-center items-center"
        >
          <BasicPie />
          <BasicLineChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
