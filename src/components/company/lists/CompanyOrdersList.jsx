import React, { useState, useRef, useEffect, useDebugValue } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//antD
import {
  Input,
  Space,
  Table,
  Collapse,
  Form,
  Popconfirm,
  Select,
  ConfigProvider,
  Empty,
  Pagination,
} from "antd";
import faIR from "antd/lib/locale/fa_IR";
import { SearchOutlined } from "@ant-design/icons";
//swiper
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
//mui
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
//modals
import SentOrderModal from "../modals/SentOrderModal";
//slices
import { useDispatch, useSelector } from "react-redux";
import {
  selectCompaniesList,
  selectLoading,
  handleCompaniesList,
  selectDarkMode,
  RsetSentOrderModal,
  selectSentOrderModal,
  RsetCustomerDetailModal,
  selectCustomerDetailModal,
  selectProductDetailModal,
  RsetProductDetailModal,
  selectUser,
  RsetCurrentOrder,
  selectCurrentOrder,
  selectTotalOrder,
} from "../../../slices/mainSlices";
import {
  handleCustomerOrderList,
  handleCustomerOrderPerList,
  selectCustomerOrdersListPerCompany,
} from "../../../slices/customerSlices";
import {
  selectCompanyOrdersList,
  RsetCompanyOrdersList,
  handleCompanyOrderActions,
  selectCompanyOrderListReloader,
  RsetCompanyOrderListReloader,
  selectCompanyAcceptModal,
  RsetCompanyAcceptModal,
  handleCompaniesOrdersList,
  RsetCompanyCode,
  selectCompanyCode,
  RsetCompanyOrderLastAction,
  RsetCompanyListPageNumber,
  RsetCompanyListPageSize,
} from "../../../slices/companySlices";
import CompanyAcceptModal from "../modals/CompanyAcceptModal";
import Loading from "../../common/Loading";
import CustomerDetailModal from "../modals/CustomerDetailModal";
import ProductDetailModal from "../modals/ProductDetailModal";
import { actionsBtn } from "../../../helpers/index";
import moment from "jalali-moment";
import { errorMessage } from "../../../utils/toast";
import { FixedSizeList as List } from "react-window";
import axios from "axios";

const CompanyOrdersList = () => {
  const dispatch = useDispatch();
  //
  const [active, setActive] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  //handle pagination pageNumber and page size
  const handlePaginationChange = (page, pageSize) => {
    setPagination({ ...pagination, current: page, pageSize });
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(RsetCompanyListPageNumber(pagination.current));
    dispatch(RsetCompanyListPageSize(pagination.pageSize));
  }, [pagination]);

  //selects
  const user = useSelector(selectUser);
  const darkMode = useSelector(selectDarkMode);
  const companiesList = useSelector(selectCompaniesList);
  const customerOrdersListPerCompany = useSelector(
    selectCustomerOrdersListPerCompany
  );
  const companyCode = useSelector(selectCompanyCode);
  const companyOrdersList = useSelector(selectCompanyOrdersList);
  const currentOrder = useSelector(selectCurrentOrder);
  const companyOrderListReloader = useSelector(selectCompanyOrderListReloader);
  const companyAcceptModal = useSelector(selectCompanyAcceptModal);
  const loading = useSelector(selectLoading);
  const customerDetailModal = useSelector(selectCustomerDetailModal);
  const productDetailModal = useSelector(selectProductDetailModal);
  const totalOrders = useSelector(selectTotalOrder);

  //handleLists

  // //customer list
  // useEffect(() => {
  //   dispatch(RsetCompanyCode(""));
  //   dispatch(handleCustomerOrderList());
  // }, []);

  //companies list
  useEffect(() => {
    dispatch(handleCompaniesList());
  }, [currentOrder]);

  //companyOrder
  useEffect(() => {
    dispatch(RsetCompanyOrderListReloader(false));
    dispatch(handleCompaniesOrdersList());
  }, [
    companyCode,
    companyOrderListReloader,
    pagination.current,
    pagination.pageSize,
  ]);

  //mui theme

  const theme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "iranSans, Arial, sans-serif", // Change the font family as desired
    },
  });

  //swiper

  // const swiperRef = useRef(null);

  // const slideNext = () => {
  //   if (swiperRef.current && swiperRef.current.swiper) {
  //     swiperRef.current.swiper.slideNext();
  //   }
  // };

  // const slidePrev = () => {
  //   if (swiperRef.current && swiperRef.current.swiper) {
  //     swiperRef.current.swiper.slidePrev();
  //   }
  // };

  //antd table
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  //select
  const sentOrderModal = useSelector(selectSentOrderModal);

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space className="d-flex justify-content-between">
          <Button
            variant="contained"
            className="text-white bg-green-800 px-10 hover:bg-green-700 text-[10px]"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="sm"
          >
            جستجو
          </Button>
          <Button
            variant="contained"
            className="text-white bg-red-800  hover:bg-red-700 text-[10px]"
            size="sm"
            onClick={() => {
              clearFilters();
              setSearchText("");
              handleSearch(selectedKeys, confirm, "");
              close();
            }}
            style={{ width: 80 }}
          >
            حذف فیلتر
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      const columnValue = record[dataIndex] ? record[dataIndex].toString() : "";
      return columnValue.toLowerCase().includes(value.toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          const input = document.querySelector(
            ".ant-table-filter-dropdown input"
          );
          if (input) {
            input.focus();
          }
        }, 0);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ fontWeight: "bold" }}>{text}</span>
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  let selectedColumns = [
    {
      ...getColumnSearchProps("date", "جستجو..."),
      title: <span style={{ fontSize: "14px" }}>تاریخ ثبت سفارش</span>,
      dataIndex: "CreateDate",
      key: "date",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.date && !b.date) {
          return 0;
        }

        if (!a.date) {
          return 1;
        }

        if (!b.date) {
          return -1;
        }

        return a.date.localeCompare(b.date);
      },

      width: 50,
    },
    {
      ...getColumnSearchProps("CustomerName", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>نام مشتری</span>,
      dataIndex: "CustomerName",
      key: "CustomerName",
      render: (text, record) => (
        <span
          className="dark:text-blue-300 hover:dark:text-blue-400 text-blue-500 hover:text-blue-700"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            dispatch(RsetCurrentOrder(record));
            dispatch(RsetCustomerDetailModal(true));
          }}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => {
        if (!a.CustomerName && !b.CustomerName) {
          return 0;
        }

        if (!a.CustomerName) {
          return 1;
        }

        if (!b.CustomerName) {
          return -1;
        }

        return a.CustomerName.localeCompare(b.CustomerName);
      },

      width: 50,
    },
    {
      ...getColumnSearchProps("CompanyName", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>کارخانه</span>,
      dataIndex: "CompanyName",
      key: "CompanyName",
      sorter: (a, b) => {
        if (!a.CompanyName && !b.CompanyName) {
          return 0;
        }

        if (!a.CompanyName) {
          return 1;
        }

        if (!b.CompanyName) {
          return -1;
        }

        return a.CompanyName.localeCompare(b.CompanyName);
      },

      width: 50,
    },
    {
      ...getColumnSearchProps("OrderNo", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>شماره حواله</span>,
      dataIndex: "OrderNo",
      key: "OrderNo",
      sorter: (a, b) => {
        const orderNoA = parseInt(a.OrderNo);
        const orderNoB = parseInt(b.OrderNo);

        // Handle cases where OrderQuantity might be undefined or null
        if (isNaN(orderNoA) && isNaN(orderNoB)) {
          return 0;
        }
        if (isNaN(orderNoA)) {
          return 1;
        }
        if (isNaN(orderNoB)) {
          return -1;
        }

        // Compare OrderQuantity numerically
        return orderNoA - orderNoB;
      },

      width: 50,
    },
    {
      ...getColumnSearchProps("ProductCode", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>کد محصول</span>,
      dataIndex: "ProductCode",
      key: "ProductCode",
      render: (text, record) => (
        <span
          className="dark:text-blue-300 hover:dark:text-blue-400 text-blue-500 hover:text-blue-700"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            dispatch(RsetProductDetailModal(true));
          }}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => {
        if (!a.ProductCode && !b.ProductCode) {
          return 0;
        }

        if (!a.ProductCode) {
          return 1;
        }

        if (!b.ProductCode) {
          return -1;
        }

        return a.ProductCode.localeCompare(b.ProductCode);
      },

      width: 50,
    },
    {
      ...getColumnSearchProps("ProductName", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>شرح محصول</span>,
      dataIndex: "ProductName",
      key: "ProductName",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.ProductName && !b.ProductName) {
          return 0;
        }

        if (!a.ProductName) {
          return 1;
        }

        if (!b.ProductName) {
          return -1;
        }

        return a.ProductName.localeCompare(b.ProductName);
      },

      width: 50,
    },
    {
      title: <span style={{ fontSize: "16px" }}>تعداد سفارش</span>,
      dataIndex: "OrderQuantity",
      key: "OrderQuantity",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        // Convert OrderQuantity to numbers for comparison
        const orderQuantityA = parseInt(a.OrderQuantity);
        const orderQuantityB = parseInt(b.OrderQuantity);

        // Handle cases where OrderQuantity might be undefined or null
        if (isNaN(orderQuantityA) && isNaN(orderQuantityB)) {
          return 0;
        }
        if (isNaN(orderQuantityA)) {
          return 1;
        }
        if (isNaN(orderQuantityB)) {
          return -1;
        }

        // Compare OrderQuantity numerically
        return orderQuantityA - orderQuantityB;
      },
      ...getColumnSearchProps("OrderQuantity", "جستجو..."),

      width: 50,
    },

    {
      ...getColumnSearchProps("SentQuantity", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>تعداد سفارش ارسالی</span>,
      dataIndex: "SentQuantity",
      key: "SentQuantity",
      render: (text, record) => (
        <span
          className="dark:text-blue-300 hover:dark:text-blue-400 text-blue-500 hover:text-blue-700"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            dispatch(RsetSentOrderModal(true));
          }}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => {
        // Convert OrderQuantity to numbers for comparison
        const orderQuantityA = parseInt(a.OrderQuantity);
        const orderQuantityB = parseInt(b.OrderQuantity);

        // Handle cases where OrderQuantity might be undefined or null
        if (isNaN(orderQuantityA) && isNaN(orderQuantityB)) {
          return 0;
        }
        if (isNaN(orderQuantityA)) {
          return 1;
        }
        if (isNaN(orderQuantityB)) {
          return -1;
        }

        // Compare OrderQuantity numerically
        return orderQuantityA - orderQuantityB;
      },

      width: 50,
    },
    {
      ...getColumnSearchProps("OrderQuantity", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>مانده سفارش</span>,
      dataIndex: "remainOrders",
      key: "remainOrders",
      render: (text, record) => (
        <span>{record.OrderQuantity - record.SentQuantity}</span>
      ),
      sorter: (a, b) => {
        // Calculate remaining quantity
        const remainingA = parseInt(a.OrderQuantity) - parseInt(a.SentQuantity);
        const remainingB = parseInt(b.OrderQuantity) - parseInt(b.SentQuantity);

        // Handle cases where remaining quantity might be undefined or null
        if (isNaN(remainingA) && isNaN(remainingB)) {
          return 0;
        }
        if (isNaN(remainingA)) {
          return 1;
        }
        if (isNaN(remainingB)) {
          return -1;
        }

        // Compare remaining quantity numerically
        return remainingA - remainingB;
      },

      width: 50,
    },
    {
      ...getColumnSearchProps("Creator", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>کارشناس فروش</span>,
      dataIndex: "Creator",
      key: "Creator",
      sorter: (a, b) => {
        if (!a.Creator && !b.Creator) {
          return 0;
        }

        if (!a.Creator) {
          return 1;
        }

        if (!b.Creator) {
          return -1;
        }

        return a.Creator.localeCompare(b.Creator);
      },

      width: 50,
    },
    {
      ...getColumnSearchProps("ActionFaName", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>آخرین وضعیت</span>,
      dataIndex: "ActionFaName",
      key: "ActionFaName",
      sorter: (a, b) => {
        if (!a.ActionFaName && !b.ActionFaName) {
          return 0;
        }

        if (!a.ActionFaName) {
          return 1;
        }

        if (!b.ActionFaName) {
          return -1;
        }

        return a.ActionFaName.localeCompare(b.ActionFaName);
      },

      width: 50,
    },
    {
      ...(companyOrdersList.some(
        (item) =>
          item.LastActionCode === 3 ||
          item.LastActionCode === 4 ||
          item.LastActionCode === 5 ||
          item.LastActionCode === 6 ||
          item.LastActionCode === 7
      )
        ? {
            title: <span style={{ fontSize: "16px" }}>زمان ارسال ماشین</span>,
            dataIndex: "sendCarDate",
            key: "sendCarDate",
            sorter: (a, b) => {
              if (!a.sendCarDate && !b.sendCarDate) {
                return 0;
              }

              if (!a.sendCarDate) {
                return 1;
              }

              if (!b.sendCarDate) {
                return -1;
              }

              return a.sendCarDate.localeCompare(b.sendCarDate);
            },
            render: (_, record) => <span>{handleSendCarDate(record)}</span>,
            width: 150,
          }
        : null),
    },
    {
      title: <span style={{ fontSize: "16px" }}>تغییر وضعیت سفارش</span>,
      dataIndex: "opration",
      key: "opration",
      render: (_, record) => <span>{operation(record)}</span>,
      width: 150,
    },
  ];

  //handle the table when conditionaly wants to render
  selectedColumns = selectedColumns.filter(
    (column) => Object.keys(column).length > 0
  );

  //handle the company column
  if (companyCode !== "") {
    selectedColumns = selectedColumns.filter(
      (column) => column.key !== "CompanyName"
    );
  }

  const paginationConfig = {
    position: ["bottomCenter"],
    // showTotal: (total) => (
    //   <span className="font12"> مجموع کارخانه ها : {total}</span>
    // ),
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: ["10", "20", "50", "100"],
    size: "middle",
    onChange: handlePaginationChange,
    total: totalOrders,
    current: currentPage,
  };

  // handleSendCarDate
  const handleSendCarDate = (record) => {
    if (record.outputLog === null) {
      return <span className="text-white">هنوز زمانی مشخص نشده است</span>;
    } else {
      return (
        <div>
          {record.outputLog.CarModel === "" ||
          record.outputLog.CarPlate === "" ||
          record.outputLog.DriverName === "" ? (
            <div
              id="action-done"
              title="مشخصات ماشین را وارد کنید"
              className="dark:bg-gray-900 bg-gray-500  p-2 rounded-xl text-center text-white"
              active
            >
              {moment
                .utc(record.outputLog.Date, "YYYY/MM/DD")
                .locale("fa")
                .format("jYYYY/jMM/jDD")}{" "}
              <span className="text-[10px]">مشخصات ماشین توسط مشتری تعیین نشده است</span>
            </div>
          ) : (
            <div
              id="action-done"
              title="مشخصات ماشین"
              className="bg-green-700 p-2 rounded-xl flex flex-col gap-1 items-center justify-center text-white"
              active
              size="small"
            >
              <div id="sendCarDate" className="flex">
                <p className="ms-2 text-[12px]">
                  {" "}
                  {moment
                    .utc(record.outputLog.Date, "YYYY/MM/DD")
                    .locale("fa")
                    .format("jYYYY/jMM/jDD")}
                </p>
              </div>
              <div id="driverName" className="flex">
                <p>نام راننده : </p>
                <p className="ms-2">{record.outputLog.DriverName}</p>
              </div>
              <div id="driverName" className="flex">
                <p>پلاک : </p>
                <p className="ms-2">{record.outputLog.CarPlate}</p>
              </div>
              <div id="driverName" className="flex">
                <p>مدل : </p>
                <p className="ms-2">{record.outputLog.CarModel}</p>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  //handle opration
  const operation = (request) => {
    const loadingStatus =
      actionsBtn.findIndex(
        (item) => item.no === Number(request.LastActionCode)
      ) + 1;
    return (
      <div className="flex justify-center gap-2">
        <div
          id="action"
          title="تغییر وضعیت"
          className={`text-white ${
            request.outputLog.CarModel === "" ||
            request.outputLog.CarPlate === "" ||
            request.outputLog.DriverName === ""
              ? "dark:bg-gray-900 bg-gray-500"
              : "bg-blue-700 hover:bg-blue-900"
          } py-2 px-4 rounded-xl text-center`}
          active
          onClick={() => {
            if (
              request.outputLog.CarModel === "" ||
              request.outputLog.CarPlate === "" ||
              request.outputLog.DriverName === ""
            ) {
              errorMessage("مشخصات ماشین توسط مشتری ایجاد نشده است");
            } else {
              dispatch(RsetCurrentOrder(request));
              dispatch(RsetCompanyAcceptModal(true));
            }
          }}
          size="small"
        >
          {actionsBtn[loadingStatus].faName}
        </div>
      </div>
    );
  };

  return (
    <div dir="rtl" className="flex flex-col gap-5">
      <div id="list" className="flex flex-col gap-5">
        <ThemeProvider theme={theme}>
          <div
            dir="ltr"
            className="flex mx-10 mt-10 mb-5 items-center justify-center"
          >
            {/* <Button
              variant="outlined"
              size="small"
              className=" dark:border-blue-500 border-gray-400 dark:text-gray-300  dark:hover:text-white dark:hover:border-blue-300 rounded-xl me-2 text-black"
              onClick={slidePrev}
            >
              <span className="text-[13px]">
                <ArrowCircleLeftOutlinedIcon className="text-[50px]" />
              </span>
            </Button> */}
            {/* <Swiper
              spaceBetween={7}
              slidesPerView={7}
              // navigation={true}
              className="swiper-container"
              // modules={[Navigation]}
              ref={swiperRef}
              // breakpoints={}
            > */}
            <div className="flex gap-5">
              {companiesList.map((item, idx) => {
                return (
                  // <SwiperSlide key={idx} virtualIndex={idx} className="">
                  <div>
                    <Button
                      key={idx}
                      onClick={(e) => {
                        setActive(idx);
                        // setSelectedDetail(item.detail);
                        dispatch(RsetCompanyCode(String(item.companycode)));
                        //customerCode is fake
                        // dispatch(handleCustomerOrderPerList());
                        // handleCompaniesOrderList(e);
                      }}
                      size="large"
                      variant="outlined"
                      className={`dark:text-gray-200 text-black text-[13px] rounded-2xl hover:dark:bg-gray-800 hover:bg-gray-300 hover:border-gray-400 hover:dark:text-white w-[180px] py-3 ${
                        idx === active
                          ? "dark:bg-gray-800  bg-blue-300 dark:text-gray-100 border-blue-500"
                          : "dark:bg-transparent dark:border-gray-700 border-gray-400"
                      }`}
                    >
                      {item.companyname}
                    </Button>
                  </div>
                  // </SwiperSlide>
                );
              })}
              <Button
                onClick={(e) => {
                  dispatch(RsetCompanyCode(""));
                  // handleCompaniesOrderList(e);
                  setActive(-1);
                }}
                size="large"
                variant="outlined"
                className={`dark:text-gray-200 text-black text-[13px] rounded-2xl hover:dark:bg-gray-800 hover:bg-gray-300 hover:border-gray-400 hover:dark:text-white w-[180px] py-3 ${
                  -1 === active
                    ? "dark:bg-gray-800  bg-blue-300 dark:text-gray-100 border-blue-500"
                    : "dark:bg-transparent dark:border-gray-700 border-gray-400"
                }`}
              >
                {/* {item.companyname} */}
                همه شرکت ها
              </Button>
            </div>
            {/* </Swiper> */}
            {/* <Button
              variant="outlined"
              size="small"
              className=" dark:border-blue-500 border-gray-400 dark:text-gray-300  dark:hover:text-white dark:hover:border-blue-300 rounded-xl me-2 text-black"
              onClick={slideNext}
            >
              <span className="text-[13px]">
                <ArrowCircleRightOutlinedIcon className="text-[50px]" />
              </span>
            </Button> */}
          </div>
          <div className="h-full">
            {loading === false ? (
              <div
                id="detail_list"
                className="bg-white rounded-2xl l mt-10 mb-10 mx-5 "
              >
                <ConfigProvider
                  locale={faIR}
                  theme={{
                    token: {
                      // Seed Token
                      // colorPrimary: "#00b96b",
                      // Alias Token
                      colorBgContainer: `${!darkMode ? "#303030" : "#fff"}`,
                      // colorText: "white",
                      colorText: `${!darkMode ? "white" : "black"}`,
                      colorTextHeading: "white",
                      colorTextPlaceholder: `${!darkMode ? "white" : "black"}`,
                      // borderColor: "#000",
                    },
                    components: {
                      Table: {
                        colorBgContainer: ` ${
                          !darkMode ? "#222a38" : "#e3e3e3"
                        }`,
                        borderColor: "#000",
                        rowHoverBg: `${!darkMode ? "#3b4157" : "#ccc"}`,
                        colorText: `${!darkMode ? "white" : "black"}`,
                        headerBg: `${!darkMode ? "#1c283d" : "#424c58"}`,
                        headerSortHoverBg: `${!darkMode ? "#000" : "#888a89"}`,
                        headerSortActiveBg: `${!darkMode ? "#000" : "#888a89"}`,
                        filterDropdown: {
                          colorText: `${!darkMode ? "white" : "white"}`, // Change text color in search box
                        },
                        // headerFilterHoverIcon: "#fff",
                        // headerFilterIcon: "#fff",
                      },
                    },
                  }}
                >
                  <Table
                    locale={{
                      emptyText: <Empty description="اطلاعات موجود نیست!" />,
                    }}
                    className="list"
                    bordered={true}
                    // dataSource={customerOrdersListPerCompany}
                    dataSource={companyOrdersList}
                    columns={selectedColumns}
                    pagination={paginationConfig}
                    scroll={{ x: "max-content" }}
                    size="middle"
                    // onChange={handlePaginationChange}
                    // showTotal={(totalOrders, range) =>
                    //   `${range[0]}-${range[1]} of ${totalOrders} items`
                    // }
                    // onRow={(record) => ({
                    //   onClick: () => handleRowClick(record),
                    // })}
                  />
                </ConfigProvider>
              </div>
            ) : (
              <div className="flex justify-center mt-24">
                <Loading width={"100px"} height={"100px"} />
              </div>
            )}
          </div>
        </ThemeProvider>
      </div>
      {sentOrderModal && <SentOrderModal />}
      {companyAcceptModal && <CompanyAcceptModal />}
      {customerDetailModal && <CustomerDetailModal />}
      {productDetailModal && <ProductDetailModal />}
    </div>
  );
};

export default CompanyOrdersList;
