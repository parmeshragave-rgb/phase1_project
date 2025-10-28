import React, { Component } from 'react'
import { useNavigate ,useParams} from "react-router-dom";
import axios from 'axios'
import { Box, CardContent, CardMedia,Typography,Card,Grid,Button,Stack } from '@mui/material';

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

  render() {
    const {product}=this.state
    if (!product || !product.id) {
  return <Typography sx={{ mt: 10, textAlign: "center" }}>Loading...</Typography>;
}
    return (
   <Box sx={{ mt: 10, p: 4 }}>
      <Grid container spacing={4} sx={{flexDirection:{xs: "column", md: "row" }}} >

          <Grid item xs={12} md={6} >
               <CardMedia
        component="img"
        image={product.image}
        sx={{height: 400, objectFit: "contained",width:"auto"}}
      />
    </Grid>

    <Grid item xs={12} md={6}>
      <Typography variant="h5" gutterBottom>{product.title}</Typography>
      <Typography variant="subtitle1" gutterBottom>
        {product.category.toUpperCase()}
      </Typography>
      <Typography variant="body1" sx={{ my: 2 }}>
        {product.description}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        $ {product.price}
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary">Add to Cart</Button>
        <Button variant="contained" color="sucess">Buy Now</Button>
      </Stack>
    </Grid>
  </Grid>
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
