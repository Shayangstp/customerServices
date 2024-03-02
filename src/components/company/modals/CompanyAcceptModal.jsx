import React from "react";
import { Modal, Button, ConfigProvider } from "antd";
import { DtPicker } from "react-calendar-datetime-picker";
// import { Button } from "@mui/material";
import fa_IR from "antd/lib/locale/fa_IR";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentOrder,
  RsetCurrentOrder,
  RsetFormErrors,
  selectFormErrors,
} from "../../../slices/mainSlices";
import {
  selectCompanyAcceptModal,
  RsetCompanyAcceptModal,
  handleCompanyOrderActions,
  RsetCompanyOrderListReloader,
  RsetCompanySendCarDate,
  selectCompanySendCarDate,
} from "../../../slices/companySlices";
import jalaliMoment from "jalali-moment";
import { postSendCarDate } from "../../../services/companiesServices";
import { errorMessage, successMessage } from "../../../utils/toast";
import moment from "jalali-moment";

const CompanyAcceptModal = () => {
  const dispatch = useDispatch();
  const companyAcceptModal = useSelector(selectCompanyAcceptModal);
  const currentOrder = useSelector(selectCurrentOrder);
  const companySendCarDate = useSelector(selectCompanySendCarDate);
  const formErrors = useSelector(selectFormErrors);

  const handleModalCancel = () => {
    dispatch(RsetCompanyAcceptModal(false));
    dispatch(RsetFormErrors({}));
  };

  const companySendCarDateIsValid = companySendCarDate !== undefined;
  console.log(companySendCarDateIsValid);
  console.log(companySendCarDate);

  const validation = () => {
    let errors = {};
    if (!companySendCarDateIsValid) {
      errors.companySendCarDate = "انتخاب زمان ارسال ماشین اجباری است";
    }
    return errors;
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

  const handleCompanySendCarDate = async () => {
    if (companySendCarDateIsValid === true) {
      const values = {
        orderNo: currentOrder.OrderNo,
        sendCarDate: jalaliMoment(
          `${companySendCarDate.year}/${companySendCarDate.month}/${companySendCarDate.day}`,
          "jYYYY/jM/jD"
        ).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      };
      const postSendCarDateRes = await postSendCarDate(values);
      console.log(postSendCarDateRes);
      if (postSendCarDateRes.data.code === 200) {
        successMessage(postSendCarDateRes.data.message);
        dispatch(handleCompanyOrderActions());
        dispatch(RsetCompanyOrderListReloader(true));
        handleModalCancel();
      } else {
        errorMessage("خطا!");
      }
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            companySendCarDate,
          })
        )
      );
    }
  };

  //min date for datePicker the package has problem
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = {
    year: Number(
      moment(tomorrow.getFullYear(), "YYYY").locale("fa").format("YYYY")
    ),
    month: Number(moment(tomorrow.getMonth(), "MM").locale("fa").format("MM")),
    day: Number(moment(tomorrow.getDate(), "DD").locale("fa").format("DD")),
  };

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={
          currentOrder.latestActionCode === 2
            ? `لطفا زمان ارسال ماشین را برای مشتری مشخص کنید`
            : ` تفییر وضعیت سفارش ${currentOrder.OrderNo}`
        }
        open={companyAcceptModal}
        styles={modalStyles}
        closable={false}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button
              style={{ background: "#3d783b", color: "white" }}
              onClick={() => {
                if (currentOrder.latestActionCode === 2) {
                  handleCompanySendCarDate();
                } else {
                  dispatch(RsetCompanyOrderListReloader(true));
                  dispatch(handleCompanyOrderActions());
                  handleModalCancel();
                }
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
        {currentOrder.latestActionCode === 2 ? (
          <form className="">
            <div id="date">
              <label className="font-bold">
                تاریخ ارسال ماشین<span className="ms-1">:</span>
                <span className="me-2 ms-2 text-red-500">*</span>
              </label>
              <DtPicker
                isRequired
                inputClass="mt-3 p-5"
                placeholder="انتخاب..."
                minDate={minDate}
                onChange={(e) => {
                  dispatch(RsetCompanySendCarDate(e));
                }}
                value={companySendCarDate}
                local="fa"
                showWeekend
              />
              {!companySendCarDateIsValid && (
                <p className="text-red-500 mt-1 text-[12px]">
                  {formErrors.companySendCarDate}
                </p>
              )}
            </div>
          </form>
        ) : (
          <p className="font-bold">{`آیا از تغییر وضعیت سفارش ${currentOrder.OrderNo} مطمئن هستید؟`}</p>
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default CompanyAcceptModal;
