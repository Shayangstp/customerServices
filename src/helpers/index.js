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
    name: "کارکنان",
    no: 3,
  },
];
