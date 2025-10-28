import React, { Component } from "react";
import { Box, Toolbar } from "@mui/material";
import Navbar from "./Navbar";


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issidebarOpen: false,
    };
  }

 

  render() {
    return (
      <>
        <Navbar/>
        <Box component="main" sx={{flexGrow: 1,p: 3,mt: 8, }}>
                <Toolbar />
            {this.props.children}
        </Box>
        
        
        
        {/* <Sidebar open={this.state.issidebarOpen} onClose={this.handleDrawerToggle} /> */}
       </>
         
        
    );
  }
}

export default Layout
