import React, { Component } from "react";
import { Box, Toolbar } from "@mui/material";
import Navbar from "./Navbar";


class Layout extends Component {
  
  render() {
    return (
      <>
        <Navbar/>
        <Box component="main" sx={{flexGrow: 1,p: 3}}>
                <Toolbar />
               

            {this.props.children}
        </Box>
       </>
         
        
    );
  }
}

export default Layout
