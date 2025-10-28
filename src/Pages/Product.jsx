import React, { Component } from 'react'
import { Grid,Card,CardMedia,CardActions, Box, CardContent,Typography,Toolbar ,Button} from '@mui/material'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Searchbar from '../Components/Searchbar';
import Categorydrop from '../Components/Categorydrop';
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
   

    fetchdata = (cat='') =>{
       const api=(cat)
       ? `https://fakestoreapi.com/products/category/${cat}`
       : 'https://fakestoreapi.com/products'
        
       axios.get(api)
       .then(res => {
        this.setState({
            products:res.data

        })
        console.log(res.data)
     })
     .catch(error => console.log(error))
    }


    componentDidMount(){
        this.fetchdata()
    }


    handlecatchange = (cat) =>{
        this.fetchdata(cat)
    }
  render() {
    const{products}=this.state;
    return (
      <>
<Box sx={{ px: 4, mb: 3 }}>
  <Grid container justifyContent="space-around" spacing={2}>
    <Grid item xs={12} md={6} lg={8}>
      <Searchbar />
    </Grid>

    <Grid item xs={12} md="auto">
      <Categorydrop oncatchange={this.handlecatchange} />
    </Grid>
  </Grid>
</Box>
<Toolbar />

<Grid container spacing={2} justifyContent="center">
      {products.map(products =>  <Grid item xs={12} sm={6} md={3}  lg={3} key={products.id}>
         <Box>
                <Card onClick={() => {this.clickhandler(products.id)}}  sx={ {height: 400, width:280, display: "flex", flexDirection: "column",justifyContent: "space-between",pt:0,pb:0,cursor:"pointer"}}>
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
