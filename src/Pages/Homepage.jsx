import React, { Component } from "react";
import { Toolbar, Grid, Card, CardMedia, CardContent, Typography, Box, TextField, Paper, InputAdornment, Divider, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Topbgimage from "../Components/Topbgimage";
import Sliderhome from "../Components/Sliderhome";
import cdImage from '../cd.png';


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
    const { allProducts } = this.state;

    return (
      <>
        

        <Topbgimage />



        {allProducts.length > 0 && (
          <Sliderhome
            productsslide={this.state.allProducts}
            navigate={this.props.navigate}
          />
        )}



        

<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    p: 1,
    mb:0
  }}
>
  <Box
  component="img"
  src={cdImage}
  alt="product"
  sx={{
    height: "110px",
     width: {xs:"250px",sm:"300px",md:"450px"},
    objectFit: "contain",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  }}
/>
  
</Box>

        <Box sx={{ ml: "120px", mr: "120px" }}>
          <Grid container spacing={2} sx={{ mb: "10px" }} justifyContent="center">
            {allProducts.slice(0, 18).map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>

                <Card
                  onClick={() => this.clickhandler(product.id)}
                  sx={{
                    height: 180,
                    width: 150,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    boxShadow: 4,
                    borderRadius: 3,
                    backgroundColor: "#dfddebff",
                    alignItems: "center",
                    border: "0px",
                    borderRadius: "16px",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 6px rgba(17, 5, 66, 0.56)",

                    "&:hover": {
                      borderColor: "#dfddebff",
                      boxShadow: "4px 4px 4px 4px rgba(0, 42, 127, 0.6)",
                      transform: "scale(1.05)",

                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="60"
                    image={product.image}
                    sx={{
                      objectFit: "contain",
                      p: 2,
                      transition: "transform 0.4s ease",
                      "&:hover": {
                        transform: "scale(1.2)",
                      }
                    }
                    }
                  />
                  <CardContent sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Stack spacing={1}>
                      <Typography sx={{ fontFamily: "sans-serif", fontWeight: "bold", fontSize: "12px" }}>
                        {product.title.charAt(0).toUpperCase() + product.title.slice(1, 12)}
                      </Typography>
                      <Typography sx={{ fontFamily: "sans-serif", fontWeight: "bold", fontSize: "12px", display: "flex", justifyContent: "center" }}>
                        {Math.floor(Math.random() * (60 - 10 + 1)) + 10} %Off
                      </Typography>
                    </Stack>
                  </CardContent>
                  {/* <CardContent sx={{ flexGrow: 1 }}>
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
                    </CardContent> */}
                </Card>

              </Grid>

            ))}

          </Grid>
        </Box>


      </>
    );
  }
}

function HomeWrapper() {
  const navigate = useNavigate();
  return <Homepage navigate={navigate} />;
}

export default HomeWrapper;
