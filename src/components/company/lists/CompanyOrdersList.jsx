import React, { useState, useRef, useEffect } from "react";
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
} from "../../../slices/mainSlices";
import {
  handleCustomerOrderList,
  handleCustomerOrderPerList,
  selectCustomerOrdersListPerCompany,
} from "../../../slices/customerSlices";
import {
  selectCompanyOrdersList,
  RsetCompanyOrdersList,
  RsetCurrentOrder,
  selectCurrentOrder,
  handleCompanyOrderActions,
  selectCompanyOrderListReloader,
  RsetCompanyOrderListReloader,
  selectCompanyAcceptModal,
  RsetCompanyAcceptModal,
  handleCompaniesOrdersList,
  RsetCompanyCode,
  selectCompanyCode,
} from "../../../slices/companySlices";
import CompanyAcceptModal from "../modals/CompanyAcceptModal";
import Loading from "../../common/Loading";
import CustomerDetailModal from "../modals/CustomerDetailModal";
import ProductDetailModal from "../modals/ProductDetailModal";

const CompanyOrdersList = () => {
  const dispatch = useDispatch();
  //
  const [active, setActive] = useState(-1);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState([]);
  //selects

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

  //handleLists

  //customer list
  useEffect(() => {
    dispatch(handleCustomerOrderList());
  }, []);

  //companies list
  useEffect(() => {
    dispatch(handleCompaniesList());
  }, [currentOrder]);

  //companyOrder
  useEffect(() => {
    dispatch(RsetCompanyOrderListReloader(false));
    dispatch(handleCompaniesOrdersList());
  }, [companyCode, companyOrderListReloader]);

  //mui theme

  const theme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "iranSans, Arial, sans-serif", // Change the font family as desired
    },
  });

  //swiper

  const swiperRef = useRef(null);

  const slideNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

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

  const selectedColumns = [
    {
      ...getColumnSearchProps("date", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>تاریخ سفارش</span>,
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
      ...getColumnSearchProps("OrderNo", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>نام مشتری</span>,
      dataIndex: "CustomerName",
      key: "CustomerName",
      render: (text, record) => (
        <span
          className="dark:text-blue-300 hover:dark:text-blue-400 text-blue-500 hover:text-blue-700"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            dispatch(RsetCustomerDetailModal(true));
            console.log("hi");
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
      ...getColumnSearchProps("OrderNo", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>کد سفارش</span>,
      dataIndex: "OrderNo",
      key: "OrderNo",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.OrderNo && !b.OrderNo) {
          return 0;
        }

        if (!a.OrderNo) {
          return 1;
        }

        if (!b.OrderNo) {
          return -1;
        }

        return a.OrderNo.localeCompare(b.OrderNo);
      },

      width: 50,
    },
    {
      ...getColumnSearchProps("ProductCode", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>کد کالا</span>,
      dataIndex: "ProductCode",
      key: "ProductCode",
      render: (text, record) => (
        <span
          className="dark:text-blue-300 hover:dark:text-blue-400 text-blue-500 hover:text-blue-700"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            dispatch(RsetProductDetailModal(true));
            console.log("hi");
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
      title: <span style={{ fontSize: "16px" }}>شرح کالا</span>,
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
    // {
    //   ...getColumnSearchProps("fee", "جستجو..."),
    //   title: <span style={{ fontSize: "16px" }}>فی</span>,
    //   dataIndex: "fee",
    //   key: "fee",
    //   //   render: (text, record) => (
    //   //     <span
    //   //       style={{ cursor: "pointer" }}
    //   //       onClick={() => handleRowClick(record)}
    //   //     >
    //   //       {text}
    //   //     </span>
    //   //   ),
    //   sorter: (a, b) => {
    //     if (!a.fee && !b.fee) {
    //       return 0;
    //     }

    //     if (!a.fee) {
    //       return 1;
    //     }

    //     if (!b.fee) {
    //       return -1;
    //     }

    //     return a.fee.localeCompare(b.fee);
    //   },

    //   width: 50,
    // },
    // {
    //   ...getColumnSearchProps("price", "جستجو..."),
    //   title: <span style={{ fontSize: "16px" }}>مبلغ</span>,
    //   dataIndex: "price",
    //   key: "price",
    //   //   render: (text, record) => (
    //   //     <span
    //   //       style={{ cursor: "pointer" }}
    //   //       onClick={() => handleRowClick(record)}
    //   //     >
    //   //       {text}
    //   //     </span>
    //   //   ),
    //   sorter: (a, b) => {
    //     if (!a.price && !b.price) {
    //       return 0;
    //     }

    //     if (!a.price) {
    //       return 1;
    //     }

    //     if (!b.price) {
    //       return -1;
    //     }

    //     return a.price.localeCompare(b.price);
    //   },

    //   width: 50,
    // },
    // {
    //   ...getColumnSearchProps("discount", "جستجو..."),
    //   title: <span style={{ fontSize: "16px" }}>درصد تخفیف</span>,
    //   dataIndex: "discount",
    //   key: "discount",
    //   //   render: (text, record) => (
    //   //     <span
    //   //       style={{ cursor: "pointer" }}
    //   //       onClick={() => handleRowClick(record)}
    //   //     >
    //   //       {text}
    //   //     </span>
    //   //   ),
    //   sorter: (a, b) => {
    //     if (!a.discount && !b.discount) {
    //       return 0;
    //     }

    //     if (!a.discount) {
    //       return 1;
    //     }

    //     if (!b.discount) {
    //       return -1;
    //     }

    //     return a.discount.localeCompare(b.discount);
    //   },

    //   width: 50,
    // },
    // {
    //   ...getColumnSearchProps("discountPrice", "جستجو..."),
    //   title: <span style={{ fontSize: "16px" }}>مبلغ تخفیف</span>,
    //   dataIndex: "discountPrice",
    //   key: "discountPrice",
    //   //   render: (text, record) => (
    //   //     <span
    //   //       style={{ cursor: "pointer" }}
    //   //       onClick={() => handleRowClick(record)}
    //   //     >
    //   //       {text}
    //   //     </span>
    //   //   ),
    //   sorter: (a, b) => {
    //     if (!a.discountPrice && !b.discountPrice) {
    //       return 0;
    //     }

    //     if (!a.discountPrice) {
    //       return 1;
    //     }

    //     if (!b.discountPrice) {
    //       return -1;
    //     }

    //     return a.discountPrice.localeCompare(b.discountPrice);
    //   },

    //   width: 50,
    // },
    {
      ...getColumnSearchProps("SentQuantity", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>تعداد ارسالی</span>,
      dataIndex: "SentQuantity",
      key: "SentQuantity",
      render: (text, record) => (
        <span
          className="dark:text-blue-300 hover:dark:text-blue-400 text-blue-500 hover:text-blue-700"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            dispatch(RsetSentOrderModal(true));
            console.log("hi");
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
      title: <span style={{ fontSize: "16px" }}>مانده ارسالی</span>,
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
      ...getColumnSearchProps("statusFa", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>وضعیت</span>,
      dataIndex: "statusFa",
      key: "statusFa",
      sorter: (a, b) => {
        if (!a.statusFa && !b.statusFa) {
          return 0;
        }

        if (!a.statusFa) {
          return 1;
        }

        if (!b.statusFa) {
          return -1;
        }

        return a.statusFa.localeCompare(b.statusFa);
      },

      width: 50,
    },
    {
      title: <span style={{ fontSize: "16px" }}>عملیات</span>,
      dataIndex: "opration",
      key: "opration",
      render: (_, record) => <span>{operation(record)}</span>,
      width: 50,
    },
  ];

  const paginationConfig = {
    position: ["bottomCenter"],
    // showTotal: (total) => (
    //   <span className="font12"> مجموع کارخانه ها : {total}</span>
    // ),
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: [],
    size: "middle",
  };

  console.log(loading);

  //handle opration
  const operation = (request) => {
    return (
      <div className="flex justify-center gap-2">
        <div
          id="action-done"
          title="action"
          className="bg-green-700 hover:bg-green-600 p-2 rounded-xl text-center"
          active
          onClick={() => {
            dispatch(RsetCurrentOrder(request));
            // setTimeout(() => {
            // }, 3000);
            // dispatch(handleCompanyOrderActions());
            dispatch(RsetCompanyAcceptModal(true));
          }}
          size="small"
        >
          <CheckIcon title="action" className="text-white" />
        </div>
        <div
          id="reject"
          title="block"
          className="bg-red-700 hover:bg-red-600 p-2 rounded-xl text-center"
          active
          onClick={() => {}}
          size="small"
        >
          <BlockIcon title="action" className="text-white" />
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
            className="flex mx-10 mt-10 items-center justify-center"
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
                className="bg-white rounded-2xl l mt-24 mx-5 "
              >
                <ConfigProvider
                  locale={faIR}
                  theme={{
                    token: {
                      // Seed Token
                      // colorPrimary: "#00b96b",
                      // Alias Token
                      colorBgContainer: `${!darkMode ? "#303030" : "#fff"}`,
                      colorText: "white",
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
                        headerBg: `${!darkMode ? "#1c283d" : "gray"}`,
                        headerSortHoverBg: `${!darkMode ? "#000" : "#888a89"}`,
                        headerSortActiveBg: `${!darkMode ? "#000" : "#888a89"}`,
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
