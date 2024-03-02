import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
//mui
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//
import fa_IR from "antd/lib/locale/fa_IR";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentOrder } from "../../../slices/mainSlices";
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";
import {
  postCustomerCarDetail,
  postOrderDelivered,
} from "../../../services/customersServices";
import { errorMessage, successMessage } from "../../../utils/toast";
import {
  selectCustomerOrderDeliveredModal,
  RsetCustomerOrderDeliveredModal,
  RsetCustomerAcceptOrderLook,
  selectCustomerAcceptOrderLook,
  RsetCustomerAcceptOrderNumber,
  selectCustomerAcceptOrderNumber,
  RsetCustomerOrderListReloader,
} from "../../../slices/customerSlices";
import { handleCompanyOrderActions } from "../../../slices/companySlices";

const CustomerOrderDeliveredModal = () => {
  const [numberChecked, setNumberChecked] = useState({
    yes: false,
    no: false,
  });
  const [lookChecked, setLookChecked] = useState({
    yes: false,
    no: false,
  });

  const dispatch = useDispatch();
  const currentOrder = useSelector(selectCurrentOrder);
  const customerOrderDeliveredModal = useSelector(
    selectCustomerOrderDeliveredModal
  );
  const customerAcceptOrderNumber = useSelector(
    selectCustomerAcceptOrderNumber
  );
  const customerAcceptOrderLook = useSelector(selectCustomerAcceptOrderLook);
  const formErrors = useSelector(selectFormErrors);

  //validation
  const customerAcceptOrderNumberIsValid = customerAcceptOrderNumber !== "";
  const customerAcceptOrderLookIsValid = customerAcceptOrderLook !== "";

  const formIsValid =
    customerAcceptOrderNumberIsValid && customerAcceptOrderLookIsValid;

  const validation = () => {
    let errors = {};
    if (!customerAcceptOrderNumberIsValid) {
      errors.customerAcceptOrderNumber = "لطفا گزینه 1 را پاسخ دهید";
    }
    if (!customerAcceptOrderLookIsValid) {
      errors.customerAcceptOrderLook = "لطفا گزینه 2 را پاسخ دهید";
    }
    return errors;
  };

  const handleModalCancel = () => {
    dispatch(RsetCustomerOrderDeliveredModal(false));
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

  const handleNumbersChecked = (event) => {
    const numberChecked = { yes: false, no: false };

    if (event.target.name === "yes") {
      numberChecked.yes = event.target.checked;
      dispatch(RsetCustomerAcceptOrderNumber(1));
    } else {
      numberChecked.no = event.target.checked;
      dispatch(RsetCustomerAcceptOrderNumber(0));
    }

    setNumberChecked(numberChecked);
  };

  const handleLookChecked = (event) => {
    const lookChecked = { yes: false, no: false };

    if (event.target.name === "yes") {
      lookChecked.yes = event.target.checked;
      dispatch(RsetCustomerAcceptOrderLook(1));
    } else {
      lookChecked.no = event.target.checked;
      dispatch(RsetCustomerAcceptOrderLook(0));
    }

    setLookChecked(lookChecked);
  };

  const handleOrderDelivered = async () => {
    const values = {
      orderNo: currentOrder.OrderNo,
      orderNumbersAccepted: customerAcceptOrderNumber,
      orderlooksAccepted: customerAcceptOrderLook,
      date: new Date(),
    };

    if (formIsValid) {
      const postOrderDeliveredRes = await postOrderDelivered(values);
      console.log(postOrderDeliveredRes);
      if (postOrderDeliveredRes.data.code === 200) {
        successMessage(postOrderDeliveredRes.data.message);
        dispatch(handleCompanyOrderActions());
        dispatch(RsetCustomerOrderListReloader(true));
        handleModalCancel();
      } else {
        errorMessage("خطا");
      }
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            customerAcceptOrderNumber,
            customerAcceptOrderLook,
          })
        )
      );
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
                handleOrderDelivered();
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
        <FormGroup>
          <div id="numbers" className="flex items-center">
            <p className="">آیا سفارش از نظر تعداد کارتن درست است ؟</p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={numberChecked.yes}
                  onChange={(e) => {
                    handleNumbersChecked(e);
                  }}
                  name="yes"
                />
              }
              label="بله"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={numberChecked.no}
                  onChange={(e) => {
                    handleNumbersChecked(e);
                  }}
                  name="no"
                />
              }
              label="خیر"
            />
          </div>
          <div id="looks" className="flex items-center">
            <p className="">آیا سفارش از نظر ظاهر درست است ؟</p>
            <div className="ms-8">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={lookChecked.yes}
                    onChange={(e) => {
                      handleLookChecked(e);
                    }}
                    name="yes"
                  />
                }
                label="بله"
                className=""
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={lookChecked.no}
                    onChange={(e) => {
                      handleLookChecked(e);
                    }}
                    name="no"
                  />
                }
                label="خیر"
              />
            </div>
          </div>
          {!customerAcceptOrderNumberIsValid && (
            <p className="text-red-500 text-[12px] mt-5">
              {formErrors.customerAcceptOrderNumber}
            </p>
          )}
          {!customerAcceptOrderLookIsValid && (
            <p className="text-red-500 text-[12px] mt-5">
              {formErrors.customerAcceptOrderLook}
            </p>
          )}
        </FormGroup>
      </Modal>
    </ConfigProvider>
  );
};

export default CustomerOrderDeliveredModal;
