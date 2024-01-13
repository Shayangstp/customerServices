import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] flex flex-col gap-10 justify-center items-center">
      <h1 className="lg:text-[50px] text-[30px] font-bold dark:text-white text-black">
        Welcome Dear shayan golestanipour
      </h1>
      <div id="buttons" className="flex gap-3">
        <Button
          variant="contained"
          className="dark:bg-gray-900 dark:hover:bg-black dark:text-white bg-gray-300 hover:bg-gray-200 text-black py-3"
          onClick={() => {
            navigate("/myOrderList");
          }}
        >
          my Order List
        </Button>

        <Button
          variant="contained"
          className="dark:bg-gray-900 dark:hover:bg-black dark:text-white bg-gray-300 hover:bg-gray-200 text-black py-3"
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
