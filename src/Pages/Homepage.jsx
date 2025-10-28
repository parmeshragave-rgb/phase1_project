import React, { Component } from 'react'
import Searchbar from '../Components/Searchbar';
import { Toolbar,Grid ,Card} from '@mui/material';
// import axios from 'axios'


class Homepage extends Component {
//  constructor(props) {
//         super(props)
      
//         this.state = {
//             productscat:[]
//         }
//       }
  
// componentDidMount(){
//      axios.get('https://fakestoreapi.com/products')
//      .then(res => {
//         this.setState({
//             productscat:res.data
//         })
//      })
//      .catch(error => console.log(error))
//     }


  render() {
    //  const{productscat}=this.state;
    return (
      <>
       <Searchbar />
                <Toolbar />
      {/* <Grid container spacing={2} justifyContent="center">
      {productscat.map(products =>  if (products)<Grid item xs={12} sm={6} md="auto" key={products.id}>
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
      </Grid> */}
      </>
    )
  }
}

export default Homepage 
