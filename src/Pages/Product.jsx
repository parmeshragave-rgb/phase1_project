import React, { Component } from 'react'
import { Grid,Card,CardMedia,CardActions, Box, CardContent,Typography,Toolbar ,Button,ButtonGroup,Paper,TextField, Pagination} from '@mui/material'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Categorydrop from '../Components/Categorydrop';
import SearchIcon from '@mui/icons-material/Search';

class Product extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
          products:[],
          searchQuery: '',
          allProducts: [],
          currentPage: 1,
          productsPerPage: 8

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
            products:res.data,
            allProducts:res.data
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


  handlesearchchange = (e) => {
  const value = e.target.value.toLowerCase();

  this.setState({ searchQuery: value });

  clearTimeout(this.debounceTimer);
  this.debounceTimer = setTimeout(() => {
    const { allProducts } = this.state;

    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(value)
    );

    this.setState({ products: filtered });
  }, 500);
};

addtocart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title.substring(0, 20)} added to cart!`);
  };

handlePageChange = (event, value) => {
    this.setState({ currentPage: value });
    
  };
  render() {
    const{products,currentPage,productsPerPage}=this.state;
     const indexofLastproduct=currentPage * productsPerPage;
     const indexofFirstproduct=indexofLastproduct-productsPerPage;
     const currentProducts = products.slice(indexofFirstproduct, indexofLastproduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
      <>
      
<Box sx={{ px: 4, mb: 3 }}>      
  <Grid container justifyContent="space-between" spacing={2}>
    <Grid item xs={12} md={6} lg={8} sx={{mt:"135px"}}>
       <Paper elevation={2}>
          <ButtonGroup>
            <TextField onChange={this.handlesearchchange} variant='outlined' placeholder='Search for Products,Brands and More' type='search' size='medium' color='inherit' sx={{width:"400px",borderRadius:"50px"}}/>
             <Button variant='contained' color='inherit' ><SearchIcon/></Button>
             </ButtonGroup>
             </Paper>
    </Grid>

    <Grid item xs={12} md="auto">
      <Categorydrop oncatchange={this.handlecatchange} />
    </Grid>
  </Grid>
</Box>
<Toolbar />

<Grid container spacing={2} justifyContent="center">
      {currentProducts.map(products =>  <Grid item xs={12} sm={6} md={3}  lg={3} key={products.id}>
         <Box>
                <Card   sx={ {height: 400, width:280, display: "flex", flexDirection: "column",justifyContent: "space-between",pt:0,pb:0,cursor:"pointer"}}>
                    <CardMedia  component="img" height="200" image={products.image}  sx={{ objectFit: "contain", p: 2 }}/>
                    <CardContent sx={{flexGrow:1}}>
                  <Typography variant='h6' >{products.title.substring(0,40)}</Typography>
                  <Typography variant='body1' sx={{fontFamily:"sans-serif", fontWeight:"bold"}}>₹.{products.price}</Typography>
                  
</CardContent>
           <CardActions sx={{justifyContent:"center",mb:"5px"}}>
                <Button variant="contained" size="small" onClick={() => this.addtocart(products)}>Add to cart</Button>
            </CardActions>
                </Card>
            </Box>
          
      </Grid>)}
      </Grid>
     
     {products.length>0 && (
      <Box  sx={{ display: 'flex', justifyContent: 'center', mt: 4 ,mb:4}}>
      <Pagination
      count={totalPages}
              page={currentPage}
              onChange={this.handlePageChange}
              color="primary"
              shape="rounded"

      />
      </Box>
     )}
      </>
    )
  }
}
function ProductWrapper(){
const navigate=useNavigate()
return (<Product navigate={navigate}/>)

}
export default ProductWrapper
//onClick={() => {this.clickhandler(products.id)}}