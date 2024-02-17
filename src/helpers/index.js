import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const navData = [
  {
    name: "Home",
    href: "/home",
    icon: <HomeIcon />,
    title: "خانه",
  },
  {
    name: "MY order List",
    href: "/companyOrdersList",
    icon: <ListIcon />,
    title: "لیست سفارشات",
  },
  {
    name: "MY Finance",
    href: "/myFinance",
    icon: <AttachMoneyIcon />,
    title: "وضعیت مالی",
  },
];

export const loginSelectButtons = [
  {
    name: "Driver",
  },
  {
    name: "Customer",
  },
  {
    name: "Staff",
  },
];
