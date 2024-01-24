import React, { useState, useRef, useDebugValue, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//
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
import { Button } from "@mui/material";
import SentOrderModal from "../modals/SentOrderModal";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
//slices
import { useDispatch, useSelector } from "react-redux";
import {
  RsetSentOrderModal,
  selectSentOrderModal,
} from "../../slices/modalsSlices";
import {
  RsetCompanyCode,
  handleCompaniesList,
  selectDarkMode,
} from "../../slices/mainSlices";
import { selectCompaniesList } from "../../slices/mainSlices";
import {
  handleCustomerOrderList,
  handleCustomerOrderPerList,
  selectCustomerOrdersListPerCompany,
} from "../../slices/customerSlices";

const data = [
  {
    name: "بلور کاوه",
    detail: [
      {
        id: 1,
        date: "1402/10/01",
        referenceNO: "12234",
        productCode: "12B23",
        productDesc: "شرح کالا",
        boxes: "2300",
        fee: "12.22",
        price: "1000",
        discount: "20",
        discountPrice: "200",
        sentProduct: "1100",
        leftProduct: "1200",
        salesExpert: "میلاد حسینی",
      },
    ],
    id: 1,
  },
  {
    name: "کاوه فلوت",
    detail: [
      {
        id: 1,
        date: "1402/07/01",
        referenceNO: "88288",
        productCode: "12A90",
        productDesc: "شرح کالا",
        boxes: "3000",
        fee: "12.22",
        price: "2600",
        discount: "10",
        discountPrice: "260",
        sentProduct: "2000",
        leftProduct: "1000",
        salesExpert: "حسین اکبری",
      },
      {
        id: 2,
        date: "1402/06/01",
        referenceNO: "52523",
        productCode: "12T909",
        productDesc: "شرح کالا",
        boxes: "4000",
        fee: "12.22",
        price: "10000",
        discount: "10",
        discountPrice: "1000",
        sentProduct: "9000",
        leftProduct: "1000",
        salesExpert: "حسین اکبری",
      },
      {
        id: 2,
        date: "1402/06/01",
        referenceNO: "52523",
        productCode: "12T909",
        productDesc: "شرح کالا",
        boxes: "4000",
        fee: "12.22",
        price: "10000",
        discount: "10",
        discountPrice: "1000",
        sentProduct: "9000",
        leftProduct: "1000",
        salesExpert: "حسین اکبری",
      },
      {
        id: 2,
        date: "1402/06/01",
        referenceNO: "52523",
        productCode: "12T909",
        productDesc: "شرح کالا",
        boxes: "4000",
        fee: "12.22",
        price: "10000",
        discount: "10",
        discountPrice: "1000",
        sentProduct: "9000",
        leftProduct: "1000",
        salesExpert: "حسین اکبری",
      },
      {
        id: 2,
        date: "1402/06/01",
        referenceNO: "52523",
        productCode: "12T909",
        productDesc: "شرح کالا",
        boxes: "4000",
        fee: "12.22",
        price: "10000",
        discount: "10",
        discountPrice: "1000",
        sentProduct: "9000",
        leftProduct: "1000",
        salesExpert: "حسین اکبری",
      },
      {
        id: 2,
        date: "1402/06/01",
        referenceNO: "52523",
        productCode: "12T909",
        productDesc: "شرح کالا",
        boxes: "4000",
        fee: "12.22",
        price: "10000",
        discount: "10",
        discountPrice: "1000",
        sentProduct: "9000",
        leftProduct: "1000",
        salesExpert: "حسین اکبری",
      },
    ],
    id: 2,
  },
  {
    name: "بلور ساچی",
    detail: [],
    id: 3,
  },
  {
    name: "آسا فلوت",
    detail: [],
    id: 4,
  },
  {
    name: "فلوت دماوند",
    detail: [],
    id: 5,
  },
  {
    name: "بلور شیشه تابان",
    detail: [],
    id: 6,
  },
  {
    name: "پروژه سرامیک فردا",
    detail: [],
    id: 7,
  },
  {
    name: "کاویان جار ساچی",
    detail: [],
    id: 8,
  },
  {
    name: "ایران فلوت",
    detail: [],
    id: 9,
  },
  {
    name: "کاوه سلیس",
    detail: [],
    id: 10,
  },
  {
    name: "ساچی",
    detail: [],
    id: 11,
  },
  {
    name: "ساوه جام",
    detail: [],
    id: 12,
  },
  {
    name: "ترابر سهند ایرانیان",
    detail: [],
    id: 13,
  },
  {
    name: "ابهر سلیس",
    detail: [],
    id: 14,
  },
  {
    name: "شیشه ساچی نور",
    detail: [],
    id: 15,
  },
];

const MainList = () => {
  const dispatch = useDispatch();
  //
  const [active, setActive] = useState();
  const [selectedName, setSelectedName] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState([]);
  //selects

  const darkMode = useSelector(selectDarkMode);
  const companiesList = useSelector(selectCompaniesList);
  const customerOrdersListPerCompany = useSelector(
    selectCustomerOrdersListPerCompany
  );

  //handleLists

  useEffect(() => {
    dispatch(handleCompaniesList());
    dispatch(handleCustomerOrderList());
  }, []);

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

      width: 200,
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

      width: 200,
    },
    {
      ...getColumnSearchProps("ProductCode", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>کد کالا</span>,
      dataIndex: "ProductCode",
      key: "ProductCode",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
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

      width: 200,
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

      width: 200,
    },
    {
      ...getColumnSearchProps("OrderQuantity", "جستجو..."),
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
        if (!a.OrderQuantity && !b.OrderQuantity) {
          return 0;
        }

        if (!a.OrderQuantity) {
          return 1;
        }

        if (!b.OrderQuantity) {
          return -1;
        }

        return a.OrderQuantity.localeCompare(b.OrderQuantity);
      },

      width: 200,
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

    //   width: 200,
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

    //   width: 200,
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

    //   width: 200,
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

    //   width: 200,
    // },
    {
      ...getColumnSearchProps("SentQuantity", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>تعداد ارسالی</span>,
      dataIndex: "SentQuantity",
      key: "SentQuantity",
      render: (text, record) => (
        <span
          className="text-blue-500"
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
        if (!a.SentQuantity && !b.SentQuantity) {
          return 0;
        }

        if (!a.SentQuantity) {
          return 1;
        }

        if (!b.SentQuantity) {
          return -1;
        }

        return a.SentQuantity.localeCompare(b.SentQuantity);
      },

      width: 200,
    },
    {
      ...getColumnSearchProps("OrderQuantity", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>مانده ارسالی</span>,
      dataIndex: "OrderQuantity",
      key: "OrderQuantity",
      render: (text, record) => (
        <span>{record.OrderQuantity - record.SentQuantity}</span>
      ),
      sorter: (a, b) => {
        if (!a.OrderQuantity && !b.OrderQuantity) {
          return 0;
        }

        if (!a.OrderQuantity) {
          return 1;
        }

        if (!b.OrderQuantity) {
          return -1;
        }

        return a.OrderQuantity.localeCompare(b.OrderQuantity);
      },

      width: 200,
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

      width: 200,
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

  //

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
                  <Button
                    key={idx}
                    onClick={() => {
                      setActive(idx);
                      // setSelectedDetail(item.detail);
                      dispatch(RsetCompanyCode(item.companycode));
                      dispatch(handleCustomerOrderPerList());
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
                  // </SwiperSlide>
                );
              })}
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
            {customerOrdersListPerCompany &&
            customerOrdersListPerCompany.length > 0 ? (
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
                        rowHoverBg: `${!darkMode ? "black" : "#ccc"}`,
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
                    bordered={false}
                    dataSource={customerOrdersListPerCompany}
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
              <div className="flex justify-center items-center min-h-[50vh]">
                <p className="text-[70px] dark:text-white text-black">
                  No Order Available
                </p>
              </div>
            )}
          </div>
        </ThemeProvider>
      </div>
      {sentOrderModal && <SentOrderModal />}
    </div>
  );
};

export default MainList;
