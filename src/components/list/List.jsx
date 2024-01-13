// import React, { useState, useMemo } from "react";
// import { faIR } from "@mui/x-data-grid";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { DataGrid } from "@mui/x-data-grid";

// import "../../index.css";

// // const data = [
// //   {
// //     name: "shayan ",
// //     lname: "goli",
// //     age: "20",
// //     height: "5.5",
// //     id: 1,
// //   },
// //   {
// //     name: "baran ",
// //     lname: "goli",
// //     age: "11",
// //     height: "6",
// //     id: 2,
// //   },
// // ];

// // const columns = [
// //   {
// //     field: "id",
// //     headerName: "ID",
// //     width: 70,
// //   },
// //   { field: "name", headerName: "First name", width: 130 },
// //   { field: "lname", headerName: "Last name", width: 130 },
// // ];

// const List = ({ data, columns }) => {
//   // const theme = createTheme(faIR, corefaIR, { direction: "rtl" });
//   console.log(columns);
//   console.log(data);

//   const handleRowClick = (params) => {
//     console.log(params);
//     console.log("hi");
//   };

//   const handlecellClick = (params) => {
//     console.log(params);
//     console.log("by");
//   };

//   return (
//     <div style={{ height: "100px", width: "50%", background: "white" }}>
//       <DataGrid
//         rows={data}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         onCellClick={handlecellClick}
//         pageSizeOptions={[5, 10]}
//         // autoHeight={true}
//         columnHeaderHeight={90}
//       />
//     </div>
//   );
// };

// export default List;
