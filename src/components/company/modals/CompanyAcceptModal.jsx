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
  const outputNoIsValid = outputNo !== "";
  const sendCarByIsValid = sendCarBy !== "";
  const carPlateIsValid = carPlate !== "";
  const carDriverNameIsValid = carDriverName !== "";
  const carModelIsValid = carModel !== "";

  const sendCarByCompanyIsValid =
    carPlateIsValid && carDriverNameIsValid && carModelIsValid;

  const formIsValid =
    companySendCarDateIsValid && outputNoIsValid && sendCarByIsValid;

  const validation = () => {
    let errors = {};
    if (!companySendCarDateIsValid) {
      errors.companySendCarDate = "انتخاب زمان ارسال ماشین اجباری است";
    }
    if (!outputNoIsValid) {
      errors.outputNo = " شماره حواله خروجی اجباری است";
    }
    if (!sendCarByIsValid) {
      errors.sendCarBy = "  مشخص کردن روش ارسال ماشین اجباری است";
    }
    if (!carDriverNameIsValid) {
      errors.carDriverName = "  مشخص کردن راننده ماشین اجباری است";
    }
    if (!carModelIsValid) {
      errors.carModel = "  مشخص کردن مدل ماشین اجباری است";
    }
    if (!carPlateIsValid) {
      errors.carPlate = "  مشخص کردن پلاک ماشین اجباری است";
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
    if (formIsValid) {
      //sendCarbyCustomer
      if (sendCarBy === 1) {
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
        if (postOutputLogRes.data.code === 200) {
          successMessage(postOutputLogRes.data.message);
          dispatch(handleCompanyOrderActions());
          dispatch(RsetCompanyOrderListReloader(true));
          handleModalCancel();
          dispatch(RsetFormErrors({}));
        } else {
          errorMessage("خطا!");
        }
      }
      // sendCarbyCompany
      if (sendCarBy === 0 && sendCarByCompanyIsValid) {
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
        if (postOutputLogRes.data.code === 200) {
          successMessage(postOutputLogRes.data.message);
          dispatch(handleCompanyOrderActions());
          dispatch(RsetCompanyOrderListReloader(true));
          handleModalCancel();
          dispatch(RsetFormErrors({}));
        } else {
          errorMessage("خطا!");
        }
      } else {
        dispatch(
          RsetFormErrors(
            validation({
              carPlate,
              carDriverName,
              carModel,
            })
          )
        );
      }
      //endof the sendCarByCopany
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            companySendCarDate,
            outputNo,
            sendCarBy,
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

  const handleSendCar = (e) => {
    dispatch(RsetSendCarBy(Number(e.target.value)));
  };

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={
          currentOrder.LastActionCode === 2
            ? ` لطفا اطلاعات زیر را وارد کنید `
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
            <div id="orderNo">
              <FormLabel className="text-[12px] mt-2 text-black">
                شماره حواله :
              </FormLabel>
              <span className="ms-2">{currentOrder.OrderNo}</span>
            </div>
            <div id="customerName" className="mt-3">
              <FormLabel className="text-[12px] mt-2 text-black">
                نام مشتری :
              </FormLabel>
              <span className="ms-2">{currentOrder.CustomerName}</span>
            </div>
            <div id="date" className="mt-4">
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
              {!companySendCarDateIsValid && (
                <p className="text-red-500 mt-2 text-[12px]">
                  {formErrors.companySendCarDate}
                </p>
              )}
              <div id="OrderOutput" className="flex flex-col mt-5">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className="text-[12px] mt-2 text-black"
                >
                  شماره حواله خروجی :
                  <span className="me-2 ms-2 text-red-500">*</span>
                </FormLabel>
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: { min: 0, style: { appearance: "textfield" } },
                    inputComponent: "input",
                    endAdornment: null,
                    incrementButton: {
                      children: null,
                    },
                  }}
                  className="w-[50%] mt-3"
                  value={outputNo}
                  onChange={(e) => {
                    dispatch(RsetOutputNo(e.target.value));
                  }}
                />
              </div>
              {!outputNoIsValid && (
                <p className="text-red-500 mt-1 text-[12px]">
                  {formErrors.outputNo}
                </p>
              )}
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
                {!sendCarByIsValid && (
                  <p className="text-red-500 mt-1 text-[12px]">
                    {formErrors.sendCarBy}
                  </p>
                )}
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
                  {!carDriverNameIsValid && (
                    <p className="text-red-500 mt-1 text-[12px]">
                      {formErrors.carDriverName}
                    </p>
                  )}
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
                  {!carPlateIsValid && (
                    <p className="text-red-500 mt-1 text-[12px]">
                      {formErrors.carPlate}
                    </p>
                  )}
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
                    {!carModelIsValid && (
                      <p className="text-red-500 mt-1 text-[12px]">
                        {formErrors.carModel}
                      </p>
                    )}
                  </div>
                </form>
              ) : null}
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
