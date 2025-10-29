import React, { Component } from 'react'
import { useNavigate ,useParams} from "react-router-dom";
import axios from 'axios'
import { Box, CardContent, CardMedia,Typography,Card,Grid,Button,Stack } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReplyIcon from '@mui/icons-material/Reply'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
class ProductDetail extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
         product:{}
    }
  }

componentDidMount(){
         const {id}=this.props.params
        axios.get(`https://fakestoreapi.com/products/${id}`)
        .then(res => {
            this.setState({
                product:res.data
            })
        })
        .catch(error => alert(`Error ${error}`))
    }

    addtocart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`${product.title.substring(0, 20)} added to cart!`);
  };

  render() {
    const {product}=this.state
    if (!product || !product.id) {
  return <Typography sx={{ mt: 10, textAlign: "center" }}>Loading...</Typography>;
}
    return (
<Box sx={{ mt: 10, p: 2 }}>
  <Card
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: 1000,
      mx: "auto",
      borderRadius: 3,
      boxShadow: 5,
      overflow: "hidden",
      p: 2,
    }}
  >
   
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
      <CardMedia
        component="img"
        image={product.image}
        sx={{
          width: "100%",
          maxWidth: 350,
          height: "auto",
          objectFit: "contain",
          borderRadius: 2,
          bgcolor: "#f9f9f9",
        }}
      />
    </Box>

    
    <Box sx={{ flex: 1.2, p: 3 }}>
      <Typography
        variant="h5"
        sx={{ fontFamily: "sans-serif", fontWeight: "bold", mb: 1 }}
      >
        {product.title}
      </Typography>

      <Typography variant="subtitle1" sx={{ color: "gray", mb: 1 }}>
        {product.category.toUpperCase()}
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, textAlign: "justify" }}>
        {product.description}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        $ {product.price}
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={() => this.addtocart(product)}
          sx={{
            fontFamily: "sans-serif",
            fontWeight: "bold",
            bgcolor: "#00004d",
            "&:hover": { bgcolor: "#000080" },
          }}
        >
          <AddShoppingCartIcon sx={{ mr: 1 }} />
          Add to Cart
        </Button>

        <Button
          variant="contained"
          sx={{
            fontFamily: "sans-serif",
            fontWeight: "bold",
            bgcolor: "whitesmoke",
            color: "black",
            "&:hover": { bgcolor: "#e0e0e0" },
          }}
        >
          Buy Now
        </Button>
        <Button
          onClick={() => {this.props.navigate("/products")}}
          variant="contained"
          sx={{
            fontFamily: "sans-serif",
            fontWeight: "bold",
            bgcolor: "lightgrey",
            color: "black",
            "&:hover": { bgcolor: "#e0e0e0" },
          }}
        >
          <ArrowBackIcon sx={{mr:"10px"}}/> Back
        </Button>
      </Stack>
    </Box>
  </Card>
</Box>



    )
  }
}

function ProductDetailsWrapper() {
  const params = useParams();
  const navigate = useNavigate();
  return <ProductDetail params={params} navigate={navigate} />;
}
export default ProductDetailsWrapper
