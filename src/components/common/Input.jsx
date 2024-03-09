import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const darkInputs = styled(TextField)({
  "& label.Mui-focused": {
    color: "#5a8de0",
  },
  "& label": {
    fontSize: "12px",
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "blue",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
      borderRadius: "15px",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5a8de0",
    },
    // "& input[type=number]": {
    //   "-moz-appearance": "textfield",
    //   "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    //     display: "none",
    //     "-webkit-appearance": "none",
    //     margin: 0,
    //   },
    //   "&::placeholder": {
    //     color: "gray",
    //     fontStyle: "italic",
    //   },
    // },
  },
  "& input": {
    // Prevent browser from autofilling
    autoComplete: "off",
  },
});

export const lightInputs = styled(TextField)({
  "& label.Mui-focused": {
    color: "blue",
  },
  "& label": {
    fontSize: "12px",
    color: "black",
  },
  "& .MuiInputBase-input": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "blue",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
      borderRadius: "15px",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5a8de0",
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        display: "none",
        "-webkit-appearance": "none",
        margin: 0,
      },
      "&::placeholder": {
        color: "black", // Change placeholder text color to gray for dark mode
        fontStyle: "italic", // Apply italic style to placeholder text
      },
    },
  },
  "& input": {
    // Prevent browser from autofilling
    autoComplete: "off",
  },
  "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
    backgroundColor: "transparent", // Set background color to transparent
    "& .MuiAutocomplete-input": {
      caretColor: "white", // Set caret color to white
    },
  },
});
