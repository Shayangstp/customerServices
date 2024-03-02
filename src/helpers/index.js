import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const navData = [
  {
    name: "داشبورد",
    href: "/home",
    icon: <HomeIcon />,
    title: "خانه",
  },
  {
    name: "لیست سفارشات",
    href: "/companyOrdersList",
    icon: <ListIcon />,
    title: "لیست سفارشات",
  },
  {
    name: "وضعیت مالی",
    href: "/myFinance",
    icon: <AttachMoneyIcon />,
    title: "وضعیت مالی",
  },
];

export const loginSelectButtons = [
  {
    name: "راننده",
    no: 1,
  },
  {
    name: "مشتری",
    no: 2,
  },
  {
    name: "کارشناس",
    no: 3,
  },
];

export const actionsBtn = [
  {
    no: 1,
    faName: "ثبت سفارش",
    enName: "RegisterOrder",
  },
  {
    no: 2,
    faName: " چیدمان بارانجام شد",
    enName: "ArrangeOrder",
  },
  {
    //send car modal
    //car detail modal for customer action
    no: 3,
    faName: "بار آماده بارگیری است",
    enName: "ArrangeOrder",
  },
  {
    no: 4,
    faName: "ماشین رسید",
    enName: "CarArrived",
  },
  {
    no: 5,
    faName: "ماشین بارگیری شد",
    enName: "Loading",
  },
  {
    //end of company work
    no: 6,
    faName: "بار ترخیص شد",
    enName: "discharged",
  },
  {
    //customer action
    no: 7,
    faName: " کالا از نظر تعداد و ظاهر تکمیل تحویل اینجانب شد",
    enName: "discharged",
  },
  {
    //customer action
    no: 8,
    faName: " کالا از نظر تعداد و ظاهر تکمیل تحویل شد",
    enName: "discharged",
  },
];
