import React, { Component } from "react";
import {List,ListItem,ListItemText,Stack,Toolbar,Typography,AppBar,Badge,Box,Button,Drawer,IconButton, Divider} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = ({ 
      mobileOpen: window.innerWidth>600?false :true
    })
  }

  navhandler = () => {
    this.props.navigate("/products");
  };

  handleDrawerToggle = () => {
    this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen }));
  };

  render() {
    const { mobileOpen } = this.state;

    const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{display:"flex",justifyContent:"center"}}>
        <Typography variant="h5" sx={{fontFamily: "sans-serif",fontWeight: "bold"  }} >ECommerce.</Typography>
      </Box>
      <Divider/>
  <List sx={{}}>
    <ListItem button onClick={() => this.props.navigate("/")} sx={{cursor:"pointer"}}>
             <HomeIcon  sx={{ mr: 1 }}/><ListItemText primary="Home" sx={{fontFamily: "sans-serif", fontWeight: "bold"}}/>
    </ListItem>
      <ListItem button onClick={this.navhandler} sx={{cursor:"pointer"}}>
          <ShoppingCartCheckoutIcon sx={{ mr: 1 }} /> <ListItemText primary="Shop"  sx={{fontFamily: "sans-serif", fontWeight: "bold"}} />
       </ListItem>
    <ListItem button onClick={() => this.props.navigate("/cart")} sx={{cursor:"pointer"}}>
            <ShoppingCartIcon sx={{ mr: 1 }} /><ListItemText primary="Cart"  sx={{fontFamily: "sans-serif", fontWeight: "bold"}}/>
          </ListItem>
          <ListItem button onClick={() => this.props.navigate("/login")} sx={{cursor:"pointer"}}>
            <LoginIcon sx={{ mr: 1 }} /> <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Box>
    );

    return (
      <>
        <AppBar position="fixed" sx={{bgcolor:"#00004d"}}>
          <Toolbar>
            
            <Typography variant="h5" sx={{flexGrow: 1,fontFamily: "sans-serif",fontWeight: "bold",color:"whitesmoke" }} >
              ECommerce.
            </Typography>

            
            <Stack direction="row" spacing={2} sx={{ display: { xs: "none", md: "flex" }, alignItems: "center",color:"whitesmoke"}} >
              <Button color="inherit" sx={{ fontFamily: "sans-serif", fontWeight: "bold" }} onClick={() => this.props.navigate("/")} >Home </Button>
              <Button color="inherit" sx={{ fontFamily: "sans-serif", fontWeight: "bold" }} onClick={this.navhandler} >Shop</Button>
              <IconButton color="inherit" onClick={() => this.props.navigate("/cart")}>
                <Badge color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Button
                color="inherit"
                sx={{ fontFamily: "sans-serif", fontWeight: "bold" }}
                onClick={() => this.props.navigate("/login")}
              >
                <LoginIcon sx={{ mr: 1 }} /> Login
              </Button>
            </Stack>

            
            <IconButton sx={{ display: { xs: "block", md: "none" } }}
              color="inherit"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        
        <Drawer anchor="right" open={mobileOpen} onClose={this.handleDrawerToggle} sx={{ display: { xs: "block", md: "none" } }}>
          {drawer}
        </Drawer>
      </>
    );
  }
}

function NavWrapper() {
  const navigate = useNavigate();
  return <Navbar navigate={navigate} />;
}

export default NavWrapper;
