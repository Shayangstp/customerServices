import React, { useState, useRef } from "react";
import List from "../list/List";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
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
import { useDispatch, useSelector } from "react-redux";
import {
  RsetSentOrderModal,
  selectSentOrderModal,
} from "../../slices/modalsSlices";
import SentOrderModal from "../modals/SentOrderModal";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
  const [active, setActive] = useState();
  const [selectedName, setSelectedName] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState([]);
  //
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
  //
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
            className="text-white bg-green-700 text-[14px] hover:bg-green-600"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="sm"
            style={{ width: 90 }}
          >
            جستجو
          </Button>
          <Button
            variant="contained"
            className="text-white bg-black text-[12px] hover:bg-gray-700"
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
          <Button
            className="text-black bg-red-500 text-[14px] hover:bg-red-400"
            variant="contained"
            onClick={() => {
              close();
            }}
          >
            بستن
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
    onFilterDropdownVisibleChange: (visible) => {
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
      dataIndex: "date",
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
      ...getColumnSearchProps("date", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>کد کالا</span>,
      dataIndex: "referenceNO",
      key: "referenceNO",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.referenceNO && !b.referenceNO) {
          return 0;
        }

        if (!a.referenceNO) {
          return 1;
        }

        if (!b.referenceNO) {
          return -1;
        }

        return a.referenceNO.localeCompare(b.referenceNO);
      },

      width: 200,
    },
    {
      ...getColumnSearchProps("productCode", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>کد کالا</span>,
      dataIndex: "productCode",
      key: "productCode",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.productCode && !b.productCode) {
          return 0;
        }

        if (!a.productCode) {
          return 1;
        }

        if (!b.productCode) {
          return -1;
        }

        return a.productCode.localeCompare(b.productCode);
      },

      width: 200,
    },
    {
      ...getColumnSearchProps("productDesc", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>شرح کالا</span>,
      dataIndex: "productDesc",
      key: "productDesc",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.productDesc && !b.productDesc) {
          return 0;
        }

        if (!a.productDesc) {
          return 1;
        }

        if (!b.productDesc) {
          return -1;
        }

        return a.productDesc.localeCompare(b.productDesc);
      },

      width: 200,
    },
    {
      ...getColumnSearchProps("boxes", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>تعداد کارتن</span>,
      dataIndex: "boxes",
      key: "boxes",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.boxes && !b.boxes) {
          return 0;
        }

        if (!a.boxes) {
          return 1;
        }

        if (!b.boxes) {
          return -1;
        }

        return a.boxes.localeCompare(b.boxes);
      },

      width: 200,
    },
    {
      ...getColumnSearchProps("fee", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>فی</span>,
      dataIndex: "fee",
      key: "fee",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.fee && !b.fee) {
          return 0;
        }

        if (!a.fee) {
          return 1;
        }

        if (!b.fee) {
          return -1;
        }

        return a.fee.localeCompare(b.fee);
      },

      width: 200,
    },
    {
      ...getColumnSearchProps("price", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>مبلغ</span>,
      dataIndex: "price",
      key: "price",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.price && !b.price) {
          return 0;
        }

        if (!a.price) {
          return 1;
        }

        if (!b.price) {
          return -1;
        }

        return a.price.localeCompare(b.price);
      },

      width: 200,
    },
    {
      ...getColumnSearchProps("discount", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>درصد تخفیف</span>,
      dataIndex: "discount",
      key: "discount",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.discount && !b.discount) {
          return 0;
        }

        if (!a.discount) {
          return 1;
        }

        if (!b.discount) {
          return -1;
        }

        return a.discount.localeCompare(b.discount);
      },

      width: 200,
    },
    {
      ...getColumnSearchProps("discountPrice", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>مبلغ تخفیف</span>,
      dataIndex: "discountPrice",
      key: "discountPrice",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.discountPrice && !b.discountPrice) {
          return 0;
        }

        if (!a.discountPrice) {
          return 1;
        }

        if (!b.discountPrice) {
          return -1;
        }

        return a.discountPrice.localeCompare(b.discountPrice);
      },

      width: 200,
    },
    {
      ...getColumnSearchProps("sentProduct", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>تعداد ارسالی</span>,
      dataIndex: "sentProduct",
      key: "sentProduct",
      render: (text, record) => (
        <span
          style={{ cursor: "pointer", color: "blue" }}
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
        if (!a.sentProduct && !b.sentProduct) {
          return 0;
        }

        if (!a.sentProduct) {
          return 1;
        }

        if (!b.sentProduct) {
          return -1;
        }

        return a.sentProduct.localeCompare(b.sentProduct);
      },

      width: 200,
    },
    {
      ...getColumnSearchProps("leftProduct", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>مانده ارسالی</span>,
      dataIndex: "leftProduct",
      key: "leftProduct",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.leftProduct && !b.leftProduct) {
          return 0;
        }

        if (!a.leftProduct) {
          return 1;
        }

        if (!b.leftProduct) {
          return -1;
        }

        return a.leftProduct.localeCompare(b.leftProduct);
      },

      width: 200,
    },
    {
      ...getColumnSearchProps("salesExpert", "جستجو..."),
      title: <span style={{ fontSize: "16px" }}>کارشناس فروش</span>,
      dataIndex: "salesExpert",
      key: "salesExpert",
      //   render: (text, record) => (
      //     <span
      //       style={{ cursor: "pointer" }}
      //       onClick={() => handleRowClick(record)}
      //     >
      //       {text}
      //     </span>
      //   ),
      sorter: (a, b) => {
        if (!a.salesExpert && !b.salesExpert) {
          return 0;
        }

        if (!a.salesExpert) {
          return 1;
        }

        if (!b.salesExpert) {
          return -1;
        }

        return a.salesExpert.localeCompare(b.salesExpert);
      },

      width: 200,
    },
  ];

  const getRowClassName = (record, index) => {
    const colors = ["gray", "white"]; // Define an array of colors
    const colorIndex = index % colors.length; // Calculate the index of the color

    return `custom-row custom-row-${colorIndex}`; // Apply the custom CSS class with the color index
  };

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

  return (
    <div dir="rtl" className="flex flex-col gap-5">
      <div id="list" className="flex flex-col gap-5">
        <div dir="ltr" className="flex mx-10 mt-10 items-center">
          <Button
            variant="outlined"
            size="small"
            className=" dark:border-cyan-500 dark:text-gray-300 dark:hover:text-white dark:hover:border-cyan-300 rounded-xl me-2 text-white border-white "
            onClick={slidePrev}
          >
            <span className="text-[13px]">
              <ArrowCircleLeftOutlinedIcon className="text-[50px] " />
            </span>
          </Button>
          <Swiper
            spaceBetween={10}
            slidesPerView={6}
            // navigation={true}
            className="swiper-container"
            // modules={[Navigation]}
            ref={swiperRef}
          >
            {data.map((item, idx) => {
              return (
                <SwiperSlide key={idx} virtualIndex={idx} className="">
                  <Button
                    onClick={() => {
                      setActive(idx);
                      setSelectedDetail(item.detail);
                    }}
                    size="large"
                    variant="contained"
                    className={`dark:text-black text-[18px] hover:dark:bg-blue-500 text-white hover:dark:text-white hover:text-white w-[200px] py-3 ${
                      idx === active
                        ? "dark:bg-blue-500 bg-blue-500 dark:text-gray-100"
                        : "dark:bg-gray-200 bg-gray-500"
                    }`}
                  >
                    {item.name}
                  </Button>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Button
            variant="outlined"
            size="small"
            className=" dark:border-cyan-500 dark:text-gray-300 dark:hover:text-white dark:hover:border-cyan-300 rounded-xl me-2 text-white border-white "
            onClick={slideNext}
          >
            <span className="text-[13px]">
              <ArrowCircleRightOutlinedIcon className="text-[50px]" />
            </span>
          </Button>
        </div>
        <div className="h-full">
          {selectedDetail.length > 0 ? (
            <div
              id="detail_list"
              className="bg-white rounded-2xl l mt-16 mx-5 "
            >
              <ConfigProvider locale={faIR}>
                <Table
                  locale={{
                    emptyText: <Empty description="اطلاعات موجود نیست!" />,
                  }}
                  className="list"
                  bordered
                  dataSource={selectedDetail}
                  columns={selectedColumns}
                  rowClassName={getRowClassName}
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
      </div>
      {sentOrderModal && <SentOrderModal />}
    </div>
  );
};

export default MainList;
