import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import { navData } from "../../helpers";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness3Icon from "@mui/icons-material/Brightness3";
//slices
import { selectDarkMode, RsetDarkMode } from "../../slices/mainSlices";
import {
  RsetShowOffCanvas,
  selectShowOffCanvas,
} from "../../slices/mainSlices";
import { RsetIsLoggedIn } from "../../slices/authSlices";

const OffCanvas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector(selectDarkMode);
  const showOffCanvas = useSelector(selectShowOffCanvas);

  const list = () => (
    <div
      id="navDrawer-container"
      className={`${
        !darkMode ? "bg-gray-900" : "bg-gray-300"
      } min-h-[100vh] w-[300px]`}
      // onClick={() => dispatch(RsetShowOffCanvas(!showOffCanvas))}
      // onKeyDown={() => dispatch(RsetShowOffCanvas(!showOffCanvas))}
    >
      <div id="darkmode-logout" className="flex justify-between mb-5 mt-4">
        <div
          className="ms-5"
          onClick={() => {
            dispatch(RsetDarkMode(!darkMode));
          }}
        >
          {!darkMode ? (
            <LightModeIcon
              fontSize="small"
              className={`${
                !darkMode ? "text-white" : "text-black"
              } cursor-pointer`}
            />
          ) : (
            <Brightness3Icon
              fontSize="small"
              className={`${
                !darkMode ? "text-white" : "text-black"
              } cursor-pointer`}
            />
          )}
        </div>
        <LogoutIcon
          fontSize="small"
          className={`${
            !darkMode ? "text-white" : "text-black"
          } me-4 cursor-pointer`}
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(RsetIsLoggedIn(false));
            navigate("/");
          }}
        />
      </div>
      <List>
        {navData.map((item, idx) => (
          <ListItem
            key={idx}
            disablePadding
            onClick={() => {
              navigate(item.href);
            }}
          >
            <ListItemButton
              className={`${
                !darkMode ? "hover:bg-gray-700" : "hover :bg-gray-500"
              }`}
            >
              <ListItemText
                className={`text-start ${
                  !darkMode ? "text-white" : "text-black"
                }`}
              >
                {item.name}
              </ListItemText>
              <ListItemIcon
                className={`flex justify-center ${
                  !darkMode ? "text-white" : "text-black"
                }`}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={showOffCanvas ? true : false}
          onClose={() => dispatch(RsetShowOffCanvas(false))}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default OffCanvas;
