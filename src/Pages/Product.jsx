import React, { Component } from 'react'
import {
  Grid, Card, CardMedia, CardActions, Box, CardContent, Typography, Toolbar,
  Button, Paper, TextField, Pagination, InputAdornment, Snackbar, IconButton, Stack
} from '@mui/material'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Categorydrop from '../Components/Categorydrop';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import carosal4 from '../images/shopbg.png';
import nomatch from '../images/nomatch.png';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchQuery: '',
      allProducts: [],
      currentPage: 1,
      productsPerPage: 8,
      openSnackbar: false,
      noresult: false,
      clear: false,
      cart: [],
      loading: true,
    };
  }

  clickhandler = (id) => {
    this.props.navigate(`/product/${id}`);
  };

  fetchdata = (cat = '') => {
    const api = cat
      ? `https://fakestoreapi.com/products/category/${cat}`
      : 'https://fakestoreapi.com/products';

    axios
      .get(api)
      .then((res) => {
        this.setState({
          products: res.data,
          allProducts: res.data,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.fetchdata();
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    this.setState({ cart: savedCart });
  }

  handlecatchange = (cat) => {
    this.fetchdata(cat);
  };

  handlesearchchange = (e) => {
    const value = e.target.value.toLowerCase();
    this.setState({ searchQuery: value });

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      const { allProducts } = this.state;
      const filtered = allProducts.filter((p) =>
        p.title.toLowerCase().includes(value)
      );

      this.setState({
        products: filtered,
        noresult: filtered.length === 0,
        clear: value.length > 0,
      });
    }, 500);
  };


  addtocart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.navigate("/login");
      return;
    }
    const { products } = this.state;
    const updatedProducts = [...products];

    const index = updatedProducts.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      updatedProducts[index].quantity =
        (updatedProducts[index].quantity || 0) + 1;
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userCartKey = loggedInUser && `cart_${loggedInUser.username}`
    const cart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(userCartKey, JSON.stringify(cart));

    window.dispatchEvent(new Event("storage"));

    this.setState({
      openSnackbar: true,
      products: updatedProducts,
      cart: cart,
    });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ openSnackbar: false });
  };

  handlePageChange = (event, value) => {
    this.setState({ currentPage: value });
  };

  render() {
    const { products, currentPage, productsPerPage, cart } = this.state;
    const indexofLastproduct = currentPage * productsPerPage;
    const indexofFirstproduct = indexofLastproduct - productsPerPage;
    const currentProducts = products.slice(indexofFirstproduct, indexofLastproduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
      <>

        <Box
          sx={{
            width: "100%",
            backgroundImage: `url(${carosal4})`,
            mt: "60px",
            mb: "20px",
            boxShadow: "0 0 20px grey",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
                mt: "120px",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  p: { xs: 1, sm: 1.5 },
                  borderRadius: "50px",
                  width: "100%",
                  bgcolor: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(10px)",
                  boxShadow: 3,
                }}
              >
                <TextField
                  onChange={this.handlesearchchange}
                  variant="outlined"
                  placeholder="Search"
                  type="search"
                  value={this.state.searchQuery}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ ml: 1, mr: 1, color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: 'none' },
                      transition: "all 0.3s ease",
                      width: "100%",
                    },
                  }}
                />
                {this.state.clear && (
                  <IconButton
                    onClick={() => {
                      this.setState({
                        searchQuery: "",
                        products: this.state.allProducts,
                        noresult: false,
                        clear: false,
                      });
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
                <Categorydrop oncatchange={this.handlecatchange} />
              </Paper>
            </Box>
          </Box>
          <Toolbar />
        </Box>


        <Grid container spacing={2} justifyContent="center">
          {this.state.noresult && (
            <Stack
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant='h5'
                sx={{ fontFamily: "sans-serif", fontWeight: "bold", color: "#4f4f50a2" }}
              >
                No matches found!!!
              </Typography>
              <CardMedia component={"img"} height="300px" width="300px" image={nomatch} />
            </Stack>
          )}

          {currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={product.id}>
              <Box>
                <Card
                  sx={{
                    height: 310,
                    width: 280,
                    justifyContent: "center",
                    alignItems: "stretch",
                    flexDirection: "column",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(17, 5, 66, 0.56)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#dfddebff",
                      boxShadow: "2px 2px 2px 2px #0a1f254f",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CardMedia
                      component="img"
                      height="160"
                      width="200"
                      image={product.image}
                      sx={{
                        objectFit: "contain",
                        p: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                      onClick={() => this.clickhandler(product.id)}
                      fullWidth
                    />
                  </Box>

                  <Box
                    sx={{
                      bgcolor: "#0a1f254f",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                    width={"100%"}
                    height={"160px"}
                  >
                    <CardContent sx={{ flexGrow: 1, height: "160px" }}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        {product.title.substring(0, 25)}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          fontFamily: "sans-serif",
                          fontWeight: "bold",
                          color: "#be0909ff",
                        }}
                      >
                        ₹ {product.price}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: "8px" }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => this.addtocart(product)}
                          sx={{
                            bgcolor: "#eb9514ff",
                            color: "#0a1f25ff",
                            fontWeight: "bold",
                            width: "100px",
                          }}
                        >
                          <AddShoppingCartIcon />
                          {cart.find((item) => item.id === product.id)?.quantity || ""}
                          {window.dispatchEvent(new Event("storage"))}

                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => this.props.navigate("/cart")}
                          sx={{
                            bgcolor: "#eb9514ff",
                            color: "#0a1f25ff",
                            fontWeight: "bold",
                            width: "120px",
                          }}
                        >
                          Go to Cart
                        </Button>
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>


        {products.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={this.handlePageChange}
              shape="rounded"
            />
          </Box>
        )}


        <Snackbar
          open={this.state.openSnackbar}
          autoHideDuration={2500}
          onClose={this.handleCloseSnackbar}
          message="Item added to cart successfully!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </>
    );
  }
}

function ProductWrapper() {
  const navigate = useNavigate();
  return <Product navigate={navigate} />;
}

export default ProductWrapper;