import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RsetIsLoggedIn } from "../../slices/authSlices";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="min-h-[80vh] flex flex-col gap-10 justify-center items-center">
      <h1 className="lg:text-[50px] text-[30px] font-bold dark:text-white text-black">
        Welcome Dear shayan golestanipour
      </h1>
      <div id="buttons" className="flex gap-3">
        <Button
          variant="outlined"
          className="hover:dark:bg-gray-800 dark:border-gray-500 hover:dark:border-white dark:text-gray-300 hover:dark:text-gray-100 py-3"
          onClick={() => {
            navigate("/myOrderList");
          }}
        >
          my Order List
        </Button>

        <Button
          variant="outlined"
          className="hover:dark:bg-gray-800 dark:border-gray-500 hover:dark:border-white dark:text-gray-300 hover:dark:text-gray-100 py-3"
          onClick={() => {
            navigate("/myFinance");
          }}
        >
          my Finance
        </Button>
      </div>
    </div>
  );
};

export default Home;
