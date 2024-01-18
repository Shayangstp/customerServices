import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const navData = [
  {
    name: "Home",
    href: "/",
    icon: (
      <HomeIcon className="dark:text-white text-black transition-all delay-75" />
    ),
  },
  {
    name: "MY order List",
    href: "/myOrderList",
    icon: (
      <ListIcon className="dark:text-white text-black transition-all delay-75" />
    ),
  },
  {
    name: "MY Finance",
    href: "/myFinance",
    icon: (
      <AttachMoneyIcon className="dark:text-white text-black transition-all delay-75" />
    ),
  },
];
