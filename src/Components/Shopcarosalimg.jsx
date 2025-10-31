
import React, { Component } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carosal1 from "../images/carosal1.avif";
import carosal2 from "../images/carosal2.jpg";
import carosal3 from "../images/carosal3.png";
import carosal4 from "../images/carosal4.webp";

const carosalImages = [
  { id: 1, url: carosal1 },
  { id: 2, url: carosal2 },
  { id: 3, url: carosal3 },
  { id: 4, url: carosal4 },
];

class Shopcarosalimg extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 1500,
      autoplay: true,
      autoplaySpeed: 4000,
      fade: true,
      arrows: false,
      pauseOnHover: false,
    };

    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "60vh", md: "80vh" },
          overflow: "hidden",
        }}
      >
        <Slider {...settings}>
          {carosalImages.map((item) => (
            <Box
              key={item.id}
              sx={{
                width: "100%",
                height: { xs: "40vh", md: "50vh" },
                backgroundImage: `url(${item.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.4)",
                },
              }}
            />
          ))}
        </Slider>
      </Box>
    );
  }
}

export default Shopcarosalimg;
