import React, { Component } from "react";
import {Box, Grid, Card, CardMedia, CardContent, Typography, Button, CardActions,Stack, Toolbar} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import emptycart from '../images/emptycart.png';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: JSON.parse(localStorage.getItem("cart")) || []
    };
  }

  updateCart = (cart) => {
    this.setState({ cart:cart});
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
        item.id === id && item.quantity > 1
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
      <Box sx={{ p: 4,mt:"45px"}}>
       <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1, ml: 2 }}>
  <ShoppingCartIcon sx={{ fontSize: 44, color: "#eb9514ff", }} />
  <Typography
    variant="h5"
    sx={{
      fontWeight: "bold",
      fontSize: { xs: "30px", sm: "30px", md: "36px" },
      color:"#010a0cdc",
      fontFamily:"sans-serif"
    }}
  >
    Your Cart
  </Typography>
</Stack>
<Toolbar/>

        {cart.length === 0 ? (
          <Box sx={{display: "flex",
                   flexDirection: "column",
                   justifyContent: "center",
                alignItems: "center",
                 width: "100%",
                        textAlign: "center",}}>
          <Typography variant="h4" sx={{fontFamily:"sans-serif",fontWeight:"bold",color:"#2b2c2c3a"}}>Looks like you haven’t added anything yet..</Typography>
          <CardMedia component="img"
                     image={emptycart} 
                     sx={{ width: "300px",objectFit: "contain",height:"auto"}}
             
                        />
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {cart.map((item) => (
                <Grid item xs={12} md={6} lg={4} key={item.id}>
                  <Card  sx={ {height: 350, width:280, display: "flex", flexDirection: "column",justifyContent: "space-between",pt:0,pb:0,cursor:"pointer"}}>
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
                      
                    </CardContent>
                    <CardActions>
                      <Button sx={{fontFamily:"sans-serif",fontWeight:"bold"}} onClick={() => this.increaseQty(item.id)}>+</Button>
                      <Typography sx={{fontFamily:"sans-serif",fontWeight:"bold",color:"green"}}>{item.quantity}</Typography>
                      <Button sx={{fontFamily:"sans-serif",fontWeight:"bold"}} onClick={() => this.decreaseQty(item.id)}>-</Button>
                      <Button sx={{fontFamily:"sans-serif",fontWeight:"bold"}} color="error" onClick={() => this.removeItem(item.id)}>
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Typography variant="h5" color="success" sx={{fontFamily:"sans-serif",fontWeight:"bold"}}>Total: ₹ {total.toFixed(2)}</Typography>
            </Box>
          </>
        )}
      </Box>
    );
  }
}

export default Cart
