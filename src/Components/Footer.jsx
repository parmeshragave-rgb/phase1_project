import React, { Component } from "react";
import { Box, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
class Footer extends Component {
  render() {
    return (
     <Box
  sx={{
    bgcolor: "#0a1f25ff",
    color: "white",
    textAlign: "center",
    py: "8px",
    mt: 5,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height:"40px"
  }}
>
  <Typography
    variant="body2"
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "14px",
      fontFamily:"sans-serif",
      fontWeight:"bold"
    }}
  >
    <LocalPhoneIcon sx={{ fontSize: "16px" ,color:"#eb9514ff"}} /> +91 98765 43210 |
    <MailIcon sx={{ fontSize: "16px",color:"#eb9514ff" }} /> abc@gmail.com |
    <CopyrightIcon sx={{ fontSize: "16px",color:"#eb9514ff"}} /> 2025 E-Commerce
  </Typography>
</Box>

    );
  }
}

export default Footer;
