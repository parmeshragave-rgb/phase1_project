import React, { Component } from "react";
import { Box, Typography, Button,InputAdornment,Paper,TextField} from "@mui/material";
import carosal4 from '../images/carosal2.jpg';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

class Topbgimage extends Component {
    constructor(props) {
      super(props)
    
      this.state = {

      }
    }
  render() {
    return (
      <Box
        sx={{
          height: {md:"300px"},
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          backgroundImage:
            `url(${carosal4 })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2,textShadow:"3px 3px 0 #0a1f25ff"}}>
          Discover the Best Products
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold",mb: 4,textShadow:"3px 3px 0 #0a1f25ff"}}>
          Shop your favorite items at unbeatable prices!
        </Typography>
        <Button
          variant="contained"
          sx={{
            fontFamily:"sans-serif",
            fontWeight:"bold",
            border:0,
            borderRadius:"50px",
            bgcolor:"#eb9514ff",color:"#0a1f25ff",
            "&:hover":{
                   transform: "scale(1.05)",
            }
          }}
          onClick={() => {this.props.navigate('/products')}}
        >
          Shop Now
        </Button>
      </Box>
    );
  }
}
function TopbgWrapper(){
const navigate=useNavigate()
return (<Topbgimage navigate={navigate}/>)
}
export default TopbgWrapper
