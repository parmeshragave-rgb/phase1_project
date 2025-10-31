import React, { Component } from "react";
import Slider from "react-slick";
import { Card, CardMedia, CardContent, Typography, Box, Toolbar } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tsImage from '../ts.png';

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
        { breakpoint: "1200px", settings: { slidesToShow: 3 } },
        { breakpoint: "900px", settings: { slidesToShow: 1 } },
        { breakpoint: "600px", settings: { slidesToShow: 1 } },
      ],
    };

    return (
      <>
        <Box sx={{ width: "100%", mt: "10px", px: 3 }}>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: "15px"
          }}>
            <Box component="img"
              src={tsImage}
              alt="product"
              sx={{
                height: "70px",
                width: { xs: "250px", sm: "300px", md: "450px" },
                bgcolor: "#dfddebff",
                alignContent: "center",
                objectFit: "contain",
                borderRadius: "8px",
                    boxShadow: "0 0 10px #0a1f25ff",

                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}>
            </Box>

          </Box>

          <Slider {...settings}>
            {productsslide.map((product) => (
              <Box key={product.id} sx={{ px: 2 }}>
                <Card
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  sx={{
                    justifyContent: "center",
                    alignItems: "stretch",
                    mx: 2,
                    mr: "20px", ml: "20px",
                    height: 280,
                    width: 300,
                    display: "flex",
                    flexDirection: "column",

                    cursor: "pointer",
                    borderRadius: 3,
                    boxShadow: "4px #00004d",
                    backgroundColor: "#dfddebff",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                  </Box>
                  <Box sx={{ bgcolor: "#0a1f254f", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: 110 }}>
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="body1" noWrap>
                        {product.title.substring(0, 20)}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "#b10808fb", fontWeight: "bold" }}
                      >
                        From ₹{product.price}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>

      </>
    );
  }
}

export default Sliderhome;
