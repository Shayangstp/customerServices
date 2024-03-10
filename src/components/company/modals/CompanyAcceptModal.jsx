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
import { postOutputLog } from "../../../services/companiesServices";
import { errorMessage, successMessage } from "../../../utils/toast";
import moment from "jalali-moment";
import {
  FormLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
  TextField,
} from "@mui/material";
import {
  selectCarDriverName,
  RsetCarDriverName,
  selectCarPlate,
  RsetCarPlate,
  selectCarModel,
  RsetCarModel,
  selectSendCarBy,
  RsetSendCarBy,
  selectOutputNo,
  RsetOutputNo,
} from "../../../slices/mainSlices";

const CompanyAcceptModal = () => {
  const dispatch = useDispatch();
  const companyAcceptModal = useSelector(selectCompanyAcceptModal);
  const currentOrder = useSelector(selectCurrentOrder);
  const companySendCarDate = useSelector(selectCompanySendCarDate);
  const formErrors = useSelector(selectFormErrors);

  const carPlate = useSelector(selectCarPlate);
  const carModel = useSelector(selectCarModel);
  const carDriverName = useSelector(selectCarDriverName);
  const sendCarBy = useSelector(selectSendCarBy);
  const outputNo = useSelector(selectOutputNo);

  console.log(sendCarBy);

  const handleModalCancel = () => {
    dispatch(RsetCompanyAcceptModal(false));
    dispatch(RsetFormErrors({}));
    dispatch(RsetCarPlate(""));
    dispatch(RsetCarModel(""));
    dispatch(RsetCarDriverName(""));
    dispatch(RsetOutputNo(""));
    dispatch(RsetSendCarBy(""));
  };

  const companySendCarDateIsValid = companySendCarDate !== undefined;

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
    // if (companySendCarDateIsValid === true) {
    const values = {
      orderNo: currentOrder.OrderNo,
      outputNo: Number(outputNo),
      carModel: carModel,
      carPlate: carPlate,
      driverName: carDriverName,
      date: jalaliMoment(
        `${companySendCarDate.year}/${companySendCarDate.month}/${companySendCarDate.day}`,
        "jYYYY/jM/jD"
      ).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      carByCustomer: sendCarBy,
    };
    console.log(values);
    const postOutputLogRes = await postOutputLog(values);
    console.log(postOutputLogRes);
    // if (postSendCarDateRes.data.code === 200) {
    //   successMessage(postSendCarDateRes.data.message);
    //   dispatch(handleCompanyOrderActions());
    //   dispatch(RsetCompanyOrderListReloader(true));
    //   handleModalCancel();
    // } else {
    //   errorMessage("خطا!");
    // }
    // } else {
    //   dispatch(
    //     RsetFormErrors(
    //       validation({
    //         companySendCarDate,
    //       })
    //     )
    //   );
    // }
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

  const handleSendCar = (e) => {
    dispatch(RsetSendCarBy(Number(e.target.value)));
  };

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={
          currentOrder.LastActionCode === 2
            ? ` اطلاعات زیر را وارد کنید`
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
                if (currentOrder.LastActionCode === 2) {
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
        {currentOrder.LastActionCode === 2 ? (
          <form className="">
            <div id="date">
              <FormLabel className="text-[12px] mt-2 text-black">
                تاریخ ارسال ماشین<span className="ms-1">:</span>
                <span className="me-2 ms-2 text-red-500">*</span>
              </FormLabel>
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
              <div id="OrderOutput" className="flex flex-col mt-5">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className="text-[12px] mt-2 text-black"
                >
                  شماره حواله خروجی :
                  <span className="me-2 ms-2 text-red-500">*</span>
                </FormLabel>
                <TextField
                  className="w-[50%] mt-3"
                  value={outputNo}
                  onChange={(e) => {
                    dispatch(RsetOutputNo(e.target.value));
                  }}
                />
              </div>
              <FormControl className="mt-3">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className="text-[12px] mt-2 text-black"
                >
                  لطفا روش ارسال ماشین را انتخاب کنید :
                  <span className="me-2 ms-2 text-red-500">*</span>
                </FormLabel>
                <RadioGroup
                  name="sendCar"
                  row
                  className="mt-3"
                  onChange={handleSendCar}
                >
                  <FormControlLabel
                    value={0}
                    id="sendCarByCompany"
                    control={<Radio size="small" />}
                    label={
                      <Typography variant="body1" style={{ fontSize: "12px" }}>
                        شرکت
                      </Typography>
                    }
                    className="ms-3"
                  />
                  <FormControlLabel
                    value={1}
                    id="sendCarByCustomer"
                    control={<Radio size="small" />}
                    label={
                      <Typography variant="body1" style={{ fontSize: "12px" }}>
                        مشتری
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
              {sendCarBy === 0 ? (
                <form>
                  <div id="carDriverName" className="flex flex-col mt-5">
                    <FormLabel className="text-[12px] mt-2 text-black">
                      نام راننده :{" "}
                    </FormLabel>
                    <TextField
                      className="w-[50%] mt-2"
                      value={carDriverName}
                      onChange={(e) => {
                        dispatch(RsetCarDriverName(e.target.value));
                      }}
                    />
                  </div>
                  <div id="plate" className="flex flex-col mt-5">
                    <FormLabel className="text-[12px] mt-2 text-black">
                      پلاک :{" "}
                    </FormLabel>
                    <TextField
                      className="w-[50%] mt-2"
                      value={carPlate}
                      onChange={(e) => {
                        dispatch(RsetCarPlate(e.target.value));
                      }}
                    />
                  </div>
                  <div id="carKind" className="flex flex-col mt-5">
                    <FormLabel className="text-[12px] mt-2 text-black">
                      نوع ماشین :{" "}
                    </FormLabel>
                    <TextField
                      className="w-[50%] mt-2"
                      value={carModel}
                      onChange={(e) => {
                        dispatch(RsetCarModel(e.target.value));
                      }}
                    />
                  </div>
                </form>
              ) : null}
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
