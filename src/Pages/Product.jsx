import React, { Component } from 'react'
import { Grid,Card,CardMedia,CardActions, Box, CardContent,Typography,Toolbar ,Button,ButtonGroup,Paper,TextField, Pagination, InputAdornment,Snackbar,Alert} from '@mui/material'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Categorydrop from '../Components/Categorydrop';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

class Product extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
          products:[],
          searchQuery: '',
          allProducts: [],
          currentPage: 1,
          productsPerPage: 8,
          openSnackbar: false,
          noresult:false
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

    if (value.trim() === "") {
      this.setState({
        products: allProducts,
        noresult: false,
      });
      return;
    }
    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
          
    this.setState({
      products: filtered,
      noresult: filtered.length === 0 ? true : false,
    });

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
     this.setState({ openSnackbar: true });
  };

   handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ openSnackbar: false });
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
      

<Box sx={{ px: 2, mt: "120px" }}>
  <Grid container spacing={2} alignItems="center" justifyContent="space-around">
    <Grid item xs={12} sm={8} md={8} lg={8}>
      <Paper  elevation={2} sx={{display: "flex",alignItems: "center",p: 1,borderRadius: "50px",width: "100%",}}>
        
        <TextField onChange={this.handlesearchchange} variant="outlined" placeholder="Search" type="search" fullWidth 
         InputProps={{startAdornment:(
          <InputAdornment position='start'><SearchIcon sx={{ ml: 1, mr: 1, color: "text.secondary" }} /></InputAdornment>
         )}}
         sx={{'& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  backgroundColor: '#fff',
                  border: 'none',
                  '& fieldset': { border: 'none' }, 
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' },}}}/>
      </Paper>
    </Grid>

  
    <Grid item xs={12} sm={4} md={3} lg={3} sx={{ display: "flex", justifyContent: "center" }}>
      <Categorydrop oncatchange={this.handlecatchange} />
    </Grid>
  </Grid>
</Box>

<Toolbar />

<Grid container spacing={2} justifyContent="center">
      {this.state.noresult && <h1> No matches found</h1>}
      {currentProducts.map(products =>  <Grid item xs={12} sm={6} md={3}  lg={3} key={products.id}>
         <Box>
                <Card sx={ {height: 400, width:280, display: "flex", flexDirection: "column",justifyContent: "space-between",pt:0,pb:0,cursor:"pointer"}}>
                    <CardMedia  component="img" height="200" width="100" image={products.image}  sx={{ objectFit: "contain", p: 2}}   onClick={() => {this.clickhandler(products.id)}}/>
                    <CardContent sx={{flexGrow:1}}  onClick={() => {this.clickhandler(products.id)}}>
                  <Typography variant='h6' >{products.title.substring(0,40)}</Typography>
                  <Typography variant='body1' sx={{fontFamily:"sans-serif", fontWeight:"bold"}}>₹.{products.price}</Typography>
                  
</CardContent>
           <CardActions sx={{justifyContent:"center",mb:"5px"}}>
                <Button variant="contained" size="small" onClick={() => this.addtocart(products)} sx={{bgcolor:"#00004d"}}><AddShoppingCartIcon/></Button>
                
            
            
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
              sx={{color:"#00004d"}}
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
    )
  }
}
function ProductWrapper(){
const navigate=useNavigate()
return (<Product navigate={navigate}/>)

}
export default ProductWrapper