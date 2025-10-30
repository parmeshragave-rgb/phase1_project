import React, { Component } from "react";
import Slider from "react-slick";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Sliderhome extends Component {
  render() {
    const { productsslide, navigate } = this.props;

    if (!productsslide || productsslide.length === 0) return null;

    const settings = {
      infinite: true,
      speed: 5000,
      slidesToShow: 4,          
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,         
      cssEase: "linear",        
      arrows: false,
      pauseOnHover: true,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 3 } },
        { breakpoint: 900, settings: { slidesToShow: 1} },
        { breakpoint: 600, settings: { slidesToShow: 1 } },
      ],
    };

    return (
      <Box sx={{ width: "100%", mt: 6, px: 3}}>
             <Box sx={{ textAlign: "center", mt: 5, mb: 2 }}>
  <Typography
    variant="h5"
    sx={{
      fontWeight: 600,
      color: "#003366", 
      fontFamily: "sans-serif",
      letterSpacing: 1,
    }}
  >
    Top Sellers
  </Typography>
</Box>
        <Slider {...settings}>
          {productsslide.map((product) => (
            <Box key={product.id} sx={{ px: 2 }}>
            <Card
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              sx={{
                mx: 2,
                mr:"20px",ml:"20px",
                height: 280,
                width:300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: 3,
                // boxShadow: 4,
                backgroundColor: "#fff",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{
                  objectFit: "contain",
                  height: 170,
                  width: "100%",
                  p: 2,
                }}
              />

              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="body1" noWrap>
                  {product.title.substring(0, 20)}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#003366", fontWeight: "bold" }}
                >
                  ₹{product.price}
                </Typography>
              </CardContent>
            </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    );
  }
}

export default Sliderhome;
