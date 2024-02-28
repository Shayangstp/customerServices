import React from "react";
import { Modal, Button, ConfigProvider } from "antd";
import TextField from "@mui/material/TextField";
import fa_IR from "antd/lib/locale/fa_IR";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCustomerCarDetailModal,
  RsetCustomerCarDetailModal,
} from "../../../slices/customerSlices";
import { selectCurrentOrder } from "../../../slices/mainSlices";
import {
  RsetCustomerCarPlate,
  selectCustomerCarPlate,
  selectCustomerCarModel,
  RsetCustomerCarModel,
  selectCustomerCarDriverName,
  RsetCustomerCarDriverName,
} from "../../../slices/customerSlices";
import moment from "moment-jalaali";
import { postCustomerCarDetail } from "../../../services/customersServices";
import { errorMessage, successMessage } from "../../../utils/toast";

const CustomerCarDetailModal = () => {
  const dispatch = useDispatch();
  const customerCarDetailModal = useSelector(selectCustomerCarDetailModal);
  const currentOrder = useSelector(selectCurrentOrder);
  const customerCarPlate = useSelector(selectCustomerCarPlate);
  const customerCarModel = useSelector(selectCustomerCarModel);
  const customerCarDriverName = useSelector(selectCustomerCarDriverName);

  const handleModalCancel = () => {
    dispatch(RsetCustomerCarDetailModal(false));
  };

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
    console.log({
      customerCarPlate,
      customerCarModel,
      customerCarDriverName,
    });
    const values = {
      plate: customerCarPlate,
      model: customerCarModel,
      driverName: customerCarDriverName,
      orderNo: currentOrder.OrderNo,
    };
    const postCustomerCarDetailRes = await postCustomerCarDetail(values);
    console.log(postCustomerCarDetailRes);
    if (postCustomerCarDetailRes.data.code === 200) {
      successMessage("مشخصات ماشین با موفقیت انجام شد");
    } else {
      errorMessage("خطا");
    }
  };

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
              style={{ background: "#9c3535", color: "white" }}
              onClick={() => {
                handleModalCancel();
              }}
            >
              لفو
            </Button>
            <Button
              style={{ background: "#3d783b", color: "white" }}
              onClick={() => {
                handleModalCancel();
                handleCustomerCarDetail();
              }}
            >
              تایید
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
          <div id="plate" className="flex flex-col mt-5">
            <label className="font-bold">پلاک : </label>
            <TextField
              className="w-[50%] mt-2"
              value={customerCarPlate}
              onChange={(e) => {
                dispatch(RsetCustomerCarPlate(e.target.value));
              }}
            />
          </div>
          <div id="carKind" className="flex flex-col mt-5">
            <label className="font-bold">نوع ماشین : </label>
            <TextField
              className="w-[50%] mt-2"
              value={customerCarModel}
              onChange={(e) => {
                dispatch(RsetCustomerCarModel(e.target.value));
              }}
            />
          </div>
          <div id="carKind" className="flex flex-col mt-5">
            <label className="font-bold">نام راننده : </label>
            <TextField
              className="w-[50%] mt-2"
              value={customerCarDriverName}
              onChange={(e) => {
                dispatch(RsetCustomerCarDriverName(e.target.value));
              }}
            />
          </div>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default CustomerCarDetailModal;
