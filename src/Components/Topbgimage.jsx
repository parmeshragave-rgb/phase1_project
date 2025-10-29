import React, { Component } from "react";
import { Box, Typography, Button,InputAdornment,Paper,TextField} from "@mui/material";
import topbg from '../images/topbg.png';
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
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          backgroundImage:
            `url(${topbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Discover the Best Products
        </Typography>

        <Typography variant="h6" sx={{ mb: 4 }}>
          Shop your favorite items at unbeatable prices!
        </Typography>
 
 <Box sx={{ px: 4, mb: 3,justifyContent: "center",display: "flex",
          width:"100%"}}
        >
          
            <TextField variant="outlined" placeholder="Search for Products, Brands and More" fullWidth
              onChange={this.handlesearchchange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ ml: 1, mr: 1, color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "#fff",
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "none" },
                },display:"flex",alignItems: "center",p: 1,borderRadius: "50px",width: { xs: "85%", sm: "75%", md: "65%", lg: "50%" }
              }}
            />
          
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor:"#033164ff" ,
            fontWeight:"bold",
            border:0,
            borderRadius:"50px"
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
