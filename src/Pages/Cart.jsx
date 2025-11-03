import React, { Component } from "react";
import axios from "axios";
import {
  Box, Grid, Card, CardMedia, CardContent, Typography,
  Button, CardActions, Stack, Toolbar
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import emptycart from "../images/emptycart.png";
import { useNavigate } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      allProducts: [],
      cartId: null,
      loading: true,
      userId: 1,
    };
  }

 componentDidMount() {
  const localCart = JSON.parse(localStorage.getItem("cart"));

  if (localCart && localCart.length > 0) {
    this.setState({ cart: localCart, loading: false });
  } else {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        this.setState({ allProducts: res.data });
        this.fetchCart(res.data);
      })
      .catch((err) => console.error("Error fetching all products:", err));
  }
}


  fetchCart = (allProducts) => {
    const { userId } = this.state;
    axios.get(`https://fakestoreapi.com/carts/user/${userId}`)
      .then((res) => {
        if (res.data.length === 0) {
          this.setState({ cart: [], loading: false });
        } else {
          const cartData = res.data[0];
          const detailedCart = cartData.products.map((p) => {
            const productDetails = allProducts.find(prod => prod.id === p.productId);
            return { ...productDetails, quantity: p.quantity };
          });
          this.setState({
            cart: detailedCart,
            cartId: cartData.id,
            loading: false
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        this.setState({ loading: false });
      });
  };

  updateCart = (updatedCart) => {
  this.setState({ cart: updatedCart });
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  this.updateCartOnServer(updatedCart);
};


  updateCartOnServer = (updatedCart) => {
    const { userId, cartId } = this.state;
    const payload = {
      userId: userId,
      products: updatedCart.map((p) => ({
        productId: p.id,
        quantity: p.quantity
      }))
    };

    const apiCall = cartId
      ? axios.put(`https://fakestoreapi.com/carts/${cartId}`, payload)
      : axios.post("https://fakestoreapi.com/carts", payload);

    apiCall
      .then((res) => {
        console.log("Cart updated:", res.data);
        if (!cartId) this.setState({ cartId: res.data.id });
      })
      .catch((err) => console.error("Error updating cart:", err));
  };

  increaseQty = (id) => {
    const updated = this.state.cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    this.setState({ cart: updated });
    this.updateCart(updated);
  };

  decreaseQty = (id) => {
    const updated = this.state.cart
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    this.setState({ cart: updated });
    this.updateCart(updated);
  };

  removeItem = (id) => {
    const updated = this.state.cart.filter((item) => item.id !== id);
    this.setState({ cart: updated });
    this.updateCart(updated);
  };

  render() {
    const { cart, loading } = this.state;
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (loading)
      return (
        <Typography sx={{ mt: 10, textAlign: "center" }}>
          Loading cart...
        </Typography>
      );

    return (
      <Box sx={{ p: 4, mt: "45px" }}>
        <Stack direction="column" alignItems="left" spacing={1} sx={{ mt: 1, ml: 2 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#010a0cdc" }}
          >
            <ShoppingCartIcon
              sx={{ fontSize: 44, color: "#eb9514ff" }}
            />{" "}
            Your Cart
          </Typography>
            <Button  sx={{backgroundColor:"#eb9514ff",color:"black",width:{xs:"10px",sm:"30px",md:"30px"},fontFamily:"sans-serif",fontWeight:"bold"}}onClick={ () => this.props.navigate(-1)}>Back</Button>
          
        </Stack>
        <Toolbar />

        {cart.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                color: "#2b2c2c3a",
              }}
            >
              Looks like you haven’t added anything yet..
            </Typography>
            <CardMedia
              component="img"
              image={emptycart}
              sx={{ width: "300px", objectFit: "contain" }}
            />
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {cart.map((item) => (
                <Grid item xs={12} md={6} lg={4} key={item.id}>
                  <Card
                    sx={{
                      height: 340,
                      width: 280,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
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
                        <Typography variant="h6">
                          {item.title.substring(0, 15)}
                        </Typography>
                        <Typography>₹ {item.price}</Typography>
                      </Stack>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => this.increaseQty(item.id) } sx={{fontWeight:"bold",fontFamily:"sans-serif"}}>+</Button>
                      <Typography>{item.quantity}</Typography>
                      <Button
                       sx={{fontWeight:"bold",fontFamily:"sans-serif"}}
                        onClick={() => this.decreaseQty(item.id)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </Button>
                      <Button color="error" onClick={() => this.removeItem(item.id)} sx={{fontWeight:"bold",fontFamily:"sans-serif"}}>
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Typography variant="h5" color="success">
                Total: ₹ {total.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    );
  }
}

function WrapperCart() {
  const navigate = useNavigate();
  return <Cart navigate={navigate} />;
}

export default WrapperCart;

