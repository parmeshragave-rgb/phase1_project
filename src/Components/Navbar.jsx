import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  AppBar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useNavigate } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userCartKey = loggedInUser && `cart_${loggedInUser.username}`
    const cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
    this.state = {
      mobileOpen: false,
      isLoggedIn: !!loggedInUser,
      loggedInUser,
      anchorEl: null,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    };
  }

  componentDidMount() {
    window.addEventListener("storage", this.syncLoginState);
    window.addEventListener("storage", this.syncCartState);
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.syncLoginState);
    window.removeEventListener("storage", this.syncCartState);

  }

  syncCartState = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userCartKey = loggedInUser && `cart_${loggedInUser.username}`
    const cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    this.setState({ cartCount });
  };

  syncLoginState = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    this.setState({ isLoggedIn: !!loggedInUser, loggedInUser });
  };

  handleAvatarClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      localStorage.removeItem(`cart_${loggedInUser.username}`);
    }
    window.dispatchEvent(new Event("storage"))
    this.setState({ isLoggedIn: false, loggedInUser: null });
    this.handleMenuClose();
    this.props.navigate("/login");
  };

  render() {
    const { mobileOpen, isLoggedIn, loggedInUser, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const firstLetter = loggedInUser?.username
      ? loggedInUser.username.charAt(0).toUpperCase()
      : "";

    const drawer = (
      <Box sx={{ width: 250, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            ECommerce.
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={() => { this.props.navigate("/"); this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen })) }} sx={{ cursor: "pointer" }}>
            <HomeIcon sx={{ mr: 1 }} />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => { this.props.navigate("/products"); this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen })) }} sx={{ cursor: "pointer" }}>
            <ShoppingCartCheckoutIcon sx={{ mr: 1 }} />
            <ListItemText primary="Shop" />
          </ListItem>
          <ListItem button onClick={() => { this.props.navigate("/cart"); this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen })) }} sx={{ cursor: "pointer" }}>
            <ShoppingCartIcon sx={{ mr: 1 }} />
            <ListItemText primary="Cart" />
          </ListItem>

          {isLoggedIn ? (
            <ListItem button onClick={() => { this.handleLogout; this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen })) }} sx={{ cursor: "pointer" }}>
              <LogoutIcon sx={{ mr: 1 }} /> <ListItemText primary="Logout" />
            </ListItem>
          ) : (
            <ListItem button onClick={() => this.props.navigate("/login")}>
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
                    fontWeight: "bold",
                    color: "#eb9514ff",
                    cursor: "pointer",
                  }}
                >
                  E
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "whitesmoke",
                    cursor: "pointer",
                    mt: "7px",
                  }}
                >
                  Commerce.
                </Typography>
              </Stack>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

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
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#fcfaf8ff",
                    color: "#0a1f25ff",
                  },
                }}
                onClick={() => this.props.navigate("/")}
              >
                Home
              </Button>

              <Button
                color="inherit"
                sx={{
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#fcfaf8ff",
                    color: "#0a1f25ff",
                  },
                }}
                onClick={() => this.props.navigate("/products")}
              >
                Shop
              </Button>

              <IconButton
                color="inherit"
                sx={{
                  "&:hover": { bgcolor: "#fcfaf8ff", color: "#0a1f25ff" },
                }}
                onClick={() => this.props.navigate("/cart")}
              >
                <Badge
                  badgeContent={this.state.cartCount}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "red",
                      color: "white",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>


              {isLoggedIn ? (
                <>
                  <Avatar
                    sx={{
                      bgcolor: "#eb9514ff",
                      color: "black",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onClick={this.handleAvatarClick}
                  >
                    {firstLetter}
                  </Avatar>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleMenuClose}
                  >
                    <MenuItem disabled>
                      <Typography>{loggedInUser.username}</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  color="inherit"
                  sx={{
                    fontWeight: "bold",
                    "&:hover": {
                      bgcolor: "#fcfaf8ff",
                      color: "#0a1f25ff",
                    },
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
              onClick={() =>
                this.setState((prev) => ({
                  mobileOpen: !prev.mobileOpen,
                }))
              }
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
