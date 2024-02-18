import React from "react";
import { Modal, Button, ConfigProvider } from "antd";
// import { Button } from "@mui/material";
import fa_IR from "antd/lib/locale/fa_IR";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetSentOrderModal,
  selectSentOrderModal,
} from "../../../slices/mainSlices";

const SentOrderModal = () => {
  const dispatch = useDispatch();
  const sentOrderModal = useSelector(selectSentOrderModal);

  const handleModalCancel = () => {
    dispatch(RsetSentOrderModal(false));
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

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title="جزییات سفارشات ارسالی"
        open={sentOrderModal}
        styles={modalStyles}
        closable={false}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button
              style={{ background: "#9c3535", color: "white" }}
              onClick={() => handleModalCancel()}
            >
              لفو
            </Button>
            <Button
              style={{ background: "#3d783b", color: "white" }}
              onClick={() => handleModalCancel()}
            >
              تایید
            </Button>
          </>
        )}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </ConfigProvider>
  );
};

export default SentOrderModal;
