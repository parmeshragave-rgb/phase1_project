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
          bgcolor:"#020238ff",
          color: "white",
          textAlign: "center",
          pt:"10px",
          pb:"5px",
          mt: 5,
          width:"100%"
        }}
      >
        <Typography variant="body2" sx={{ mb: 0.5 }}>
           <LocalPhoneIcon sx={{mr:"5px" ,fontSize: "16px"}}/>+91 98765 43210 | <MailIcon sx={{mr:"5px",ml:"5px",fontSize: "16px"}}/>  abc@gmail.com
        </Typography>

        <Typography
          variant="body2"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            
          }}
        >
          <CopyrightIcon sx={{ fontSize: "16px" }} />
          2025  E-Commerce
        </Typography>
      </Box>
    );
  }
}

export default Footer;
