import React, { useEffect } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import TextField from "@mui/material/TextField";
import fa_IR from "antd/lib/locale/fa_IR";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCustomerCarDetailModal,
  RsetCustomerCarDetailModal,
} from "../../../slices/customerSlices";
import { selectCurrentOrder } from "../../../slices/mainSlices";

import moment from "moment-jalaali";
import { postCustomerCarDetail } from "../../../services/customersServices";
import { errorMessage, successMessage } from "../../../utils/toast";
import {
  selectCustomerOrderDeliveredModal,
  RsetCustomerOrderDeliveredModal,
} from "../../../slices/customerSlices";

const CustomerOrderDeliveredModal = () => {
  const dispatch = useDispatch();
  const currentOrder = useSelector(selectCurrentOrder);
  const customerOrderDeliveredModal = useSelector(
    selectCustomerOrderDeliveredModal
  );

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
        title={`لطفا موارد زیر را پاسخ دهید`}
        open={customerOrderDeliveredModal}
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
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Label"
            />
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Required"
            />
            <FormControlLabel
              disabled
              control={<Checkbox />}
              label="Disabled"
            />
          </FormGroup>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default CustomerOrderDeliveredModal;
