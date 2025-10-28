import React, { Component } from 'react'
import { Grid,Card,CardMedia,CardActions, Box, CardContent,Typography, Stack,Button} from '@mui/material'
import axios from 'axios'
class Product extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
          products:[]
      }
    }

    componentDidMount(){
     axios.get('https://fakestoreapi.com/products')
     .then(res => {
        this.setState({
            products:res.data
        })
     })
     .catch(error => console.log(error))
    }
  render() {
    const{products}=this.state;
    return (
      <>
      <Grid container spacing={2} justifyContent="center">
      {products.map(products =>  <Grid item xs={12} sm={6} direction={"row"} key={products.id}>
         <Box width={"300px"}>
                <Card sx={{height: 400,  display: "flex", flexDirection: "column",justifyContent: "space-between",pt:0,pb:0}}>
                    <CardMedia  component="img" height="200" image={products.image}  sx={{ objectFit: "contain", p: 2 }}/>
                    <CardContent sx={{flexGrow:1}}>
                  <Typography variant='h6' >{products.title.substring(0,40)}</Typography>
                  <Typography variant='body1' sx={{fontFamily:"sans-serif", fontWeight:"bold"}}>₹.{products.price}</Typography>
                  
</CardContent>
           <CardActions sx={{justifyContent:"center",mb:"5px"}}>
                <Button variant="contained" size="small">Add to cart</Button>
            </CardActions>
                </Card>
            </Box>
          
      </Grid>)}
      </Grid>
      </>
    )
  }
}
export default  Product
