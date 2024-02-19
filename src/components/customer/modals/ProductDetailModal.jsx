import React from "react";
import { Modal, Button, ConfigProvider } from "antd";
// import { Button } from "@mui/material";
import fa_IR from "antd/lib/locale/fa_IR";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductDetailModal,
  RsetProductDetailModal,
} from "../../../slices/mainSlices";

const ProductDetailModal = () => {
  const dispatch = useDispatch();
  const ProductDetailModal = useSelector(selectProductDetailModal);

  const handleModalCancel = () => {
    dispatch(RsetProductDetailModal(false));
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
        title={`مشخصات کالا`}
        open={ProductDetailModal}
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
              }}
            >
              تایید
            </Button>
          </>
        )}
      >
        <p className="font-bold">detail...</p>
      </Modal>
    </ConfigProvider>
  );
};

export default ProductDetailModal;
