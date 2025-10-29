import React, { Component } from "react";
import {Box, Grid, Card, CardMedia, CardContent, Typography, Button, CardActions} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: JSON.parse(localStorage.getItem("cart")) || []
    };
  }

  updateCart = (cart) => {
    this.setState({ cart });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  increaseQty = (id) => {
    const cart = this.state.cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    this.updateCart(cart);
  };

  decreaseQty = (id) => {
    const cart = this.state.cart
      .map((item) =>
        item.id === id && item.quantity >= 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    this.updateCart(cart);
  };

  removeItem = (id) => {
    const cart = this.state.cart.filter((item) => item.id !== id);
    this.updateCart(cart);
  };

  render() {
    const { cart } = this.state;
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
      <Box sx={{ p: 4,mt:"80px"}}>
        <Typography variant="h4" sx={{ mb: 3,fontFamily:"sans-serif",fontWeight:"bold"}}>
          <ShoppingCartIcon sx={{mt:"5px"}}/> Your Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="h6">Your cart is empty.</Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {cart.map((item) => (
                <Grid item xs={12} md={6} lg={4} key={item.id}>
                  <Card  sx={ {height: 400, width:280, display: "flex", flexDirection: "column",justifyContent: "space-between",pt:0,pb:0,cursor:"pointer"}}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={item.image}
                      sx={{ objectFit: "contain", p: 2 }}
                    />
                    <CardContent>
                      <Typography variant="h6">
                        {item.title.substring(0, 30)}
                      </Typography>
                      <Typography>₹ {item.price}</Typography>
                      <Typography>Qty: {item.quantity}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => this.increaseQty(item.id)}>+</Button>
                      <Button onClick={() => this.decreaseQty(item.id)}>-</Button>
                      <Button color="error" onClick={() => this.removeItem(item.id)}>
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Typography variant="h5">Total: ₹ {total.toFixed(2)}</Typography>
              <Button variant="contained" sx={{ mt: 2,bgcolor:"#00004d",color:"whitesmoke",fontFamily:"sans-serif",fontWeight:"bold"}}>
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    );
  }
}

export default Cart
