import React, { Component } from "react";
import {Toolbar,Grid,Card,CardMedia,CardContent,Typography,Box,TextField,Paper,InputAdornment, Divider,} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Topbgimage from "../Components/Topbgimage";
import Sliderhome from "../Components/Sliderhome";
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      allProducts: [],
      searchQuery: "",
    };
    this.debounceTimer = null;
  }

  componentDidMount() {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        const data = res.data;
        const categoryMap = {};

        data.forEach((item) => {
          if (!categoryMap[item.category]) categoryMap[item.category] = [];
          categoryMap[item.category].push(item);
        });

        const categories = Object.keys(categoryMap).map((cat) => ({
          name: cat,
          items: categoryMap[cat],
        }));

        this.setState({ categories, allProducts: data });
      })
      .catch((err) => alert(`Error: ${err}`));
  }

  clickhandler = (id) => {
    this.props.navigate(`/product/${id}`);
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

      const categoryMap = {};
      filtered.forEach((item) => {
        if (!categoryMap[item.category]) categoryMap[item.category] = [];
        categoryMap[item.category].push(item);
      });

      const categories = Object.keys(categoryMap).map((cat) => ({
        name: cat,
        items: categoryMap[cat],
      }));

      this.setState({ categories });
    }, 400);
  };

  render() {
    const { categories } = this.state;

    return (
      <>
      <Toolbar/>

        <Topbgimage/>
         {categories.length > 0 && (
  <Sliderhome
    productsslide={categories[2].items}
    navigate={this.props.navigate}
  />
)}


        
        {categories.map((category, index) => (
          <Box key={index} sx={{ my: 4, px: 4 }}>
            
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: "bold",
                fontFamily: "sans-serif",
                textAlign: "center", mt: 5,
                color:"#003366"
              }}
            >
              
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              {category.items.slice(0, 4).map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <Card
                    onClick={() => this.clickhandler(product.id)}
                    sx={{
                      height: 350,
                      width: 280,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      boxShadow: 4,
                      borderRadius: 3,
                      backgroundColor: "#fff",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      sx={{
                        objectFit: "contain",
                        p: 2,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">
                        {product.title.substring(0, 40)}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "sans-serif",
                          fontWeight: "bold",
                         
                          color: "#003366", 
     
                        }}
                      >
                        ₹{product.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
              ))}
              <Divider/>
            </Grid>
          </Box>
        ))}
      </>
    );
  }
}

function HomeWrapper() {
  const navigate = useNavigate();
  return <Homepage navigate={navigate} />;
}

export default HomeWrapper;
