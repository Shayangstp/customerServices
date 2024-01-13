import React from "react";
import List from "../list/List";

const data = [
  {
    name: "shayan ",
    lname: "goli",
    age: "20",
    height: "5.5",
    id: 1,
  },
  {
    name: "baran ",
    lname: "goli",
    age: "11",
    height: "6",
    id: 2,
  },
];

const OrderList = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    { field: "name", headerName: "First name", width: 130 },
    { field: "lname", headerName: "Last name", width: 130 },
  ];
  return (
    <div>
      <List />
    </div>
  );
};

export default OrderList;
