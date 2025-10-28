import React, { Component } from 'react'
import { Grid,Card,CardMedia,CardActions, Box, CardContent,Typography,Toolbar ,Button} from '@mui/material'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Searchbar from '../Components/Searchbar';

class Product extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
          products:[]
      }
    }

    clickhandler = (id) => {
            this.props.navigate(`/product/${id}`)
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
      <Toolbar />
       <Searchbar/>
                <Toolbar />
      <Grid container spacing={2} justifyContent="center">
      {products.map(products =>  <Grid item xs={12} sm={6} md="auto" key={products.id}>
         <Box width={"300px"}>
                <Card onClick={() => {this.clickhandler(products.id)}} sx={ {height: 400,  display: "flex", flexDirection: "column",justifyContent: "space-between",pt:0,pb:0}}>
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
function ProductWrapper(){
const navigate=useNavigate()
return (<Product navigate={navigate}/>)

}
export default ProductWrapper
