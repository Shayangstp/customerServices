import React, { useState, useMemo } from "react";
import { GridToolbar, faIR, arSD } from "@mui/x-data-grid";
// import { faIR } from "@mui/material/locale";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { DataGrid, bgBG } from "@mui/x-data-grid";
import { faIR as corefaIR } from "@material-ui/core/locale";

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

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  { field: "name", headerName: "First name", width: 130 },
  { field: "lname", headerName: "Last name", width: 130 },
];

export default function BasicTable() {
  const [locale, setLocale] = useState("faIR");
  const handleRowClick = (params) => {
    console.log(params);
    console.log("hi");
  };

  const existingTheme = useTheme();

  const theme = createTheme(
    {
      palette: {
        primary: { main: "#1976d2" },
      },
    },
    faIR,
    corefaIR
  );

  const handlecellClick = (params) => {
    console.log(params);
    console.log("by");
  };
  //   const localizedTextsMap = {
  //     columnMenuUnsort: "مرتب کردن",
  //     columnMenuSortAsc: "Classificar por ordem crescente",
  //     columnMenuSortDesc: "Classificar por ordem decrescente",
  //     columnMenuFilter: "فیلتر",
  //     columnMenuHideColumn: "Ocultar",
  //     columnMenuShowColumns: "Mostrar colunas",
  //   };
  return (
    <ThemeProvider theme={theme}>
      <div dir="rtl" style={{ height: 400, width: "50%", background: "white" }}>
        <DataGrid
          rows={data}
          //   localeText={localizedTextsMap}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          // locale={locale}
          // onRowClick={handleRowClick}
          onCellClick={handlecellClick}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </ThemeProvider>
  );
}
