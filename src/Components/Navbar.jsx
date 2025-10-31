import React, { Component } from "react";
import { List, ListItem, ListItemText, Stack, Toolbar, Typography, AppBar, Badge, Box, Button, Drawer, IconButton, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: window.innerWidth > 600 ? false : true,
      isLoggedIn: !!localStorage.getItem("token"),
    };
  }

  componentDidUpdate() {
    const token = localStorage.getItem("token");
    if (!!token !== this.state.isLoggedIn) {
      this.setState({ isLoggedIn: !!token });
    }
  }


  navhandler = () => {
    this.props.navigate("/products");
  };

  

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    this.setState({ isLoggedIn: false });
    this.props.navigate("/login");
  };

  render() {
    const { mobileOpen, isLoggedIn } = this.state;

    const drawer = (
      <Box sx={{ width: 250, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontFamily: "sans-serif", fontWeight: "bold" }}
          >
            ECommerce.
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={() => {this.props.navigate("/");this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen }))}} sx={{ cursor: "pointer" }}>
            <HomeIcon sx={{ mr: 1 }} />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => {this.props.navigate("/products");this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen }))} }sx={{ cursor: "pointer" }}>
            <ShoppingCartCheckoutIcon sx={{ mr: 1 }} />
            <ListItemText primary="Shop" />
          </ListItem>
          <ListItem button onClick={() => {this.props.navigate("/cart");this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen }))}} sx={{ cursor: "pointer" }}>
            <ShoppingCartIcon sx={{ mr: 1 }} />
            <ListItemText primary="Cart" />
          </ListItem>

          {isLoggedIn ? (
            <ListItem button onClick={this.handleLogout} sx={{ cursor: "pointer" }}>
              <LogoutIcon sx={{ mr: 1 }} /> <ListItemText primary="Logout" />
            </ListItem>
          ) : (
            <ListItem button onClick={() => this.props.navigate("/login")} sx={{ cursor: "pointer" }}>
              <LoginIcon sx={{ mr: 1 }} /> <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </Box>
    );

    return (
      <>
        <AppBar position="fixed" sx={{ bgcolor: "#0a1f25ff" }}>
          <Toolbar>

            <Box onClick={() => this.props.navigate("/")}>
              <Stack direction={"row"}>
<Typography
                variant="h4"
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  color: "#eb9514ff",
                  cursor: "pointer"
                }}
              >
                E
              </Typography>
<Typography
                variant="h5"
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  color: "whitesmoke",
                  cursor: "pointer",
                  mt:"7px"
                }}
              >
                Commerce.
              </Typography>
              </Stack>
            </Box>
            <Box sx={{ flexGrow: 1, }}>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",


              }}
            >
              <Button
                    color="inherit"
                sx={{
                  fontFamily: "sans-serif", fontWeight: "bold"
                }}
                onClick={() => this.props.navigate("/")}


              >
                Home
              </Button>
              <Button
                    color="inherit"

                sx={{
                  fontFamily: "sans-serif", fontWeight: "bold", "&:hover": { bgcolor: "#eb95144d", color: "#0a1f25ff" },
                  
                }}
                onClick={this.navhandler}
              >
                Shop
              </Button>

                  
              <IconButton   color="inherit" sx={{
                "&:hover": { bgcolor: "#eb95144d", color: "#0a1f25ff" },
              }}
                onClick={() => this.props.navigate("/cart")}>
                <Badge color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {isLoggedIn ? (
                <Button
                  color="inherit"
                  sx={{
                    fontFamily: "sans-serif", fontWeight: "bold","&:hover": { bgcolor: "#eb95144d", color: "#0a1f25ff" },
                  }
                  }
                  onClick={this.handleLogout}
                >
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </Button>
              ) : (
                <Button
                  color="inherit"
                  sx={{
                    fontFamily: "sans-serif", fontWeight: "bold", "&:hover": { bgcolor: "#eb95144d", color: "#0a1f25ff" },
                     
                  }}
                  onClick={() => this.props.navigate("/login")}
                >
                  <LoginIcon sx={{ mr: 1 }} /> Login
                </Button>
              )}
            </Stack>

            <IconButton
              sx={{ display: { xs: "block", md: "none" } }}
              color="inherit"
              onClick={() => {this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen }));}}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="right"
          open={mobileOpen}
          sx={{ display: { xs: "block", md: "none" } }}
        >
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
