
import React, { Component } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, CardActions, Stack, Toolbar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import emptycart from '../images/emptycart.png';
import { useNavigate } from "react-router-dom";
class Cart extends Component {
  constructor(props) {
    super(props);
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userCartKey = loggedInUser && `cart_${loggedInUser.username}`
    this.state = {
      cart: JSON.parse(localStorage.getItem(userCartKey)) || [],
      userCartKey
    };

    
  }

  updateCart = (cart) => {
    this.setState({ cart: cart });
     localStorage.setItem(this.state.userCartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));

  };

  increaseQty = (id) => {
    const cart = this.state.cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    this.updateCart(cart);
    window.dispatchEvent(new Event("storage"));

  };

  decreaseQty = (id) => {
    const cart = this.state.cart
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    this.updateCart(cart);
    window.dispatchEvent(new Event("storage"));

  };

  removeItem = (id) => {
    const cart = this.state.cart.filter((item) => item.id !== id);
    this.updateCart(cart);
    window.dispatchEvent(new Event("storage"));

  };

  render() {
    const { cart } = this.state;
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
      <Box sx={{ p: 4, mt: "45px" }}>
        <Stack direction="column" alignItems="left" spacing={1} sx={{ mt: 1, ml: 2 }}>
          <Stack direction={"row"}>
            <Box sx={{ mr: "10px", mt: "5px" }}> <ShoppingCartIcon sx={{ fontSize: 40, color: "#eb9514ff" }} /></Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "30px", sm: "30px", md: "36px" },
                color: "#010a0cdc",
                fontFamily: "sans-serif",
                display: "inline"
              }}
            >

              Your cart
            </Typography>
          </Stack>
          <Button sx={{ backgroundColor: "#eb9514ff", color: "black", width: { xs: "10px", sm: "30px", md: "30px" }, fontFamily: "sans-serif", fontWeight: "bold" }} onClick={() => this.props.navigate(-1)}>Back</Button>
        </Stack>
        <Toolbar />

        {cart.length === 0 ? (
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            textAlign: "center",
          }}>
            <Typography variant="h4" sx={{ fontFamily: "sans-serif", fontWeight: "bold", color: "#2b2c2c3a" }}>Looks like you haven’t added anything yet..</Typography>
            <CardMedia component="img"
              image={emptycart}
              sx={{ width: "300px", objectFit: "contain", height: "auto" }}

            />
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {cart.map((item) => (
                <Grid item xs={12} md={6} lg={4} key={item.id}>
                  <Card sx={{ height: 340, width: 280, display: "flex", flexDirection: "column", justifyContent: "space-between", pt: 0, pb: 0, cursor: "pointer" }}>
                    <Box display="flex" justifyContent="center">
                      <CardMedia
                        component="img"
                        height="150"
                        image={item.image}
                        sx={{ objectFit: "contain", p: 2 }}
                      />
                    </Box>
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography variant="h6" sx={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                          {item.title.substring(0, 15)}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "navyblue" }}>₹ {item.price}</Typography>
                      </Stack>
                    </CardContent>
                    <CardActions>
                      <Button sx={{ fontFamily: "sans-serif", fontWeight: "bold" }} onClick={() => this.increaseQty(item.id)}>+</Button>
                      <Typography sx={{ fontFamily: "sans-serif", fontWeight: "bold", color: "green" }}>{item.quantity}</Typography>
                      <Button sx={{ fontFamily: "sans-serif", fontWeight: "bold" }} onClick={() => this.decreaseQty(item.id)} disabled={item.quantity === 1 ? true : false} >-</Button>
                      <Button sx={{ fontFamily: "sans-serif", fontWeight: "bold" }} color="error" onClick={() => this.removeItem(item.id)}>
                        Remove
                      </Button>
                    </CardActions>

                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Typography variant="h5" color="success" sx={{ fontFamily: "sans-serif", fontWeight: "bold" }}>Total: ₹ {total.toFixed(2)}</Typography>
            </Box>
          </>
        )}
      </Box>
    );
  }
}

function WrapperCart() {
  const navigate = useNavigate()
  return <Cart navigate={navigate} />
}

export default WrapperCart



