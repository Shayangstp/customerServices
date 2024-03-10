import React, { useEffect } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import TextField from "@mui/material/TextField";
import fa_IR from "antd/lib/locale/fa_IR";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCustomerCarDetailModal,
  RsetCustomerCarDetailModal,
  RsetCustomerOrderListReloader,
  selectCustomerOrderListReloader,
} from "../../../slices/customerSlices";
import { selectCurrentOrder } from "../../../slices/mainSlices";

import moment from "moment-jalaali";
import { postCustomerCarDetail } from "../../../services/customersServices";
import { errorMessage, successMessage } from "../../../utils/toast";
import {
  selectCarDriverName,
  RsetCarDriverName,
  selectCarPlate,
  RsetCarPlate,
  selectCarModel,
  RsetCarModel,
} from "../../../slices/mainSlices";

const CustomerCarDetailModal = () => {
  const dispatch = useDispatch();
  const customerCarDetailModal = useSelector(selectCustomerCarDetailModal);
  const currentOrder = useSelector(selectCurrentOrder);
  const carPlate = useSelector(selectCarPlate);
  const carModel = useSelector(selectCarModel);
  const carDriverName = useSelector(selectCarDriverName);

  const handleModalCancel = () => {
    dispatch(RsetCustomerCarDetailModal(false));
    dispatch(RsetCarPlate(""));
    dispatch(RsetCarModel(""));
    dispatch(RsetCarDriverName(""));
  };

  useEffect(() => {
    if (currentOrder.carDetail !== null) {
      dispatch(RsetCarPlate(currentOrder.carDetail.plate));
      dispatch(RsetCarModel(currentOrder.carDetail.model));
      dispatch(RsetCarDriverName(currentOrder.carDetail.driverName));
    }
  }, [currentOrder]);

  const modalStyles = {
    header: {
      background: "gray",
      padding: "20px",
    },
    body: {
      borderRadius: 5,
      marginTop: "20px",
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
    footer: {
      borderTop: "1px solid gray",
      marginTop: "20px",
      padding: "20px",
    },
    content: {
      boxShadow: "0 0 30px #999",
    },
  };

  const handleCustomerCarDetail = async () => {
    const values = {
      plate: carPlate,
      model: carModel,
      driverName: carDriverName,
      orderNo: currentOrder.OrderNo,
      date: new Date(),
    };
    const postCustomerCarDetailRes = await postCustomerCarDetail(values);
    console.log(postCustomerCarDetailRes);
    if (postCustomerCarDetailRes.data.code === 200) {
      successMessage("مشخصات ماشین با موفقیت انجام شد");
      dispatch(RsetCustomerOrderListReloader(true));
    } else {
      errorMessage("خطا");
    }
  };

  const customerOrderListReloader = useSelector(
    selectCustomerOrderListReloader
  );
  console.log(customerOrderListReloader);

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={`مشخصات ماشین`}
        open={customerCarDetailModal}
        styles={modalStyles}
        closable={false}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button
              style={{ background: "#3d783b", color: "white" }}
              onClick={() => {
                handleModalCancel();
                handleCustomerCarDetail();
              }}
            >
              تایید
            </Button>
            <Button
              style={{ background: "#9c3535", color: "white" }}
              onClick={() => {
                handleModalCancel();
              }}
            >
              لفو
            </Button>
          </>
        )}
      >
        <form>
          <div className="flex" id="date">
            <p className="font-bold">زمان ارسال ماشین : </p>
            <p className="ms-5 font-bold">
              {moment
                .utc(currentOrder.sendCarDate, "YYYY/MM/DD")
                .locale("fa")
                .format("jYYYY/jMM/jDD")}
            </p>
          </div>
          <div id="carDriverName" className="flex flex-col mt-5">
            <label className="font-bold">نام راننده : </label>
            <TextField
              className="w-[50%] mt-2"
              value={carDriverName}
              onChange={(e) => {
                dispatch(RsetCarDriverName(e.target.value));
              }}
            />
          </div>
          <div id="plate" className="flex flex-col mt-5">
            <label className="font-bold">پلاک : </label>
            <TextField
              className="w-[50%] mt-2"
              value={carPlate}
              onChange={(e) => {
                dispatch(RsetCarPlate(e.target.value));
              }}
            />
          </div>
          <div id="carKind" className="flex flex-col mt-5">
            <label className="font-bold">نوع ماشین : </label>
            <TextField
              className="w-[50%] mt-2"
              value={carModel}
              onChange={(e) => {
                dispatch(RsetCarModel(e.target.value));
              }}
            />
          </div>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default CustomerCarDetailModal;
