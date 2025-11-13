import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  CardContent,
  CardMedia,
  Typography,
  Card,
  Grid,
  Button,
  Stack,
  Snackbar,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReplyIcon from '@mui/icons-material/Reply';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      openSnackbar: false,
      desLen: 150,
      expanded: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        this.setState({
          product: res.data,
        });
      })
      .catch((error) =>
  this.setState({ error: 'Error fetching product details' })
);
  }

  addtocart = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.navigate('/login');
      return;
    }
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userCartKey = loggedInUser && `cart_${loggedInUser.username}`;
    const cart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    const existing = cart.find((item) => item.id === product.id);
    let newQuantity = 1;
    if (existing) {
      existing.quantity += 1;
      newQuantity = existing.quantity;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(userCartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));

    this.setState({
      openSnackbar: true,
      product: { ...product, quantity: newQuantity },
    });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ openSnackbar: false });
  };
  toggleDescription = () => {
    this.setState((prev) => ({
      expanded: !prev.expanded,
    }));
  };

  render() {
    const { product, desLen, expanded,error } = this.state;
    
    if (error) {
    return (
      <Typography sx={{ mt: 10, textAlign: 'center', color: 'red' }}>
        {error}
      </Typography>
    );
  }
    if (!product || !product.id) {
      return (
        <Typography sx={{ mt: 10, textAlign: 'center' }}>Loading...</Typography>
      );
    }
    return (
      <Box sx={{ mt: 10, p: 2 }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: 1000,
            mx: 'auto',
            borderRadius: 3,
            boxShadow: 5,
            overflow: 'hidden',
            p: 2,
            position: 'relative',
          }}
        >
          <Button
            onClick={() => {
              this.props.navigate(-1);
            }}
            variant="text"
            sx={{
              position: 'absolute',
              top: { xs: 8, sm: 10, md: 14 },
              left: { xs: 8, sm: 12, md: 16 },
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: 'black',
              bgcolor: 'white',
              borderRadius: '50px',
              boxShadow: 2,
              zIndex: 2,
              '&:hover': { bgcolor: '#f0f0f0' },
            }}
          >
            <ArrowBackIcon sx={{ mr: 1 }} />
          </Button>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
              position: 'relative',
            }}
          >
            <CardMedia
              component="img"
              image={product.image}
                    loading='lazy'

              sx={{
                width: '100%',
                maxWidth: 350,
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 2,
                bgcolor: '#f9f9f9',
                position: 'relative',

              }}
            />
          </Box>

          <Box sx={{ flex: 1.2, p: 3 }}>
            <Typography
              variant="h5"
              sx={{ fontFamily: 'sans-serif', fontWeight: 'bold', mb: 1 }}
            >
              {product.title}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: 'gray', mb: 1 }}>
              {product.category.toUpperCase()}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
              {expanded
                ? product.description
                : `${product.description.substring(0, desLen)}... `}
              <Box
                component="span"
                onClick={this.toggleDescription}
                sx={{
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'inline',
                }}
              >
                {expanded ? 'Read Less' : 'Read more'}
              </Box>
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              ₹ {product.price}
            </Typography>

            <Stack direction="row" spacing={2}>
              {!product.quantity ? (
                <Button
                  variant="contained"
                  onClick={() => this.addtocart(product)}
                  sx={{
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',

                    '&:hover': { bgcolor: '#00008002' },
                    bgcolor: '#eb9514ff',
                    color: '#0a1f25ff',
                  }}
                >
                  <AddShoppingCartIcon sx={{ mr: 1 }} />
                  Add to Cart
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => this.props.navigate('/cart')}
                  sx={{
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',

                    '&:hover': { bgcolor: '#00008002' },
                    bgcolor: '#eb9514ff',
                    color: '#0a1f25ff',
                  }}
                >
                  <AddShoppingCartIcon sx={{ mr: 1 }} />
                  {window.dispatchEvent(new Event('storage'))}
                  Go to Cart
                </Button>
              )}

              <Button
                variant="contained"
                sx={{
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  bgcolor: 'whitesmoke',
                  color: 'black',
                  '&:hover': { bgcolor: '#e0e0e0' },
                }}
              >
                Buy Now
              </Button>
            </Stack>
          </Box>
        </Card>

        <Snackbar
          open={this.state.openSnackbar}
          autoHideDuration={2500}
          onClose={this.handleCloseSnackbar}
          message="Item added to cart successfully!"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
    );
  }
}

function ProductDetailsWrapper() {
  const params = useParams();
  const navigate = useNavigate();
  return <ProductDetail params={params} navigate={navigate} />;
}
export default ProductDetailsWrapper;
