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
      allProducts: [],
    };
  }

  componentDidMount() {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        const data = res.data;
        this.setState({ allProducts: data });
      })
      .catch((err) => alert(`Error: ${err}`));
  }

  clickhandler = (id) => {
    this.props.navigate(`/product/${id}`);
  };



  render() {
    const { allProducts } = this.state;

    return (
      <>

        <Toolbar />
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
            mb: "10px",
            mt: "10px",

          }}
        >

          <CardMedia
            component="img"
            src={cdImage}
            alt="product"
            sx={{
              border: "0px solid",
              borderColor: "#00004d",
              bgcolor: "#dfddebff",
              height: "70px",
              width: { xs: "250px", sm: "300px", md: "450px" },
              objectFit: "contain",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            boxShadow:"0 0 10px #0a1f25ff",

              "&:hover": {
                transform: "scale(1.05)",
                mt: "5px",
                mb: "20px",

              },
            }}
          />


        </Box>

        <Box sx={{ ml: {md:"120px",xs:"5px"}, mr: {md:"120px",xs:"5px"} }}>
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
                    boxShadow: "0 2px 6px #0a1f25ff",

                    "&:hover": {
                      borderColor: "#dfddebff",
                      boxShadow: "4px 4px 4px 4px #0a1f25ff",
                      transform: "scale(1.05)",

                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="80"
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
                  <Box sx={{ bgcolor: "#0a1f254f", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: 100 }}>

                    <CardContent sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Stack spacing={1}>
                        <Typography sx={{ fontFamily: "sans-serif", fontWeight: "bold", fontSize: "12px" }}>
                          {product.title.charAt(0).toUpperCase() + product.title.slice(1, 12)}
                        </Typography>
                        <Typography sx={{ fontFamily: "sans-serif", fontWeight: "bold", fontSize: "12px", display: "flex", justifyContent: "center", color: "maroon" }}>
                          {Math.floor(Math.random() * (60 - 10 + 1)) + 10}% Off
                        </Typography>
                      </Stack>
                    </CardContent>
                    </Box>
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
