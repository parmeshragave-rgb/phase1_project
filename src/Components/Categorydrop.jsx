import { Box, Paper, Button, Menu, MenuItem } from "@mui/material";
import React, { Component } from "react";
import axios from "axios";
import FilterListIcon from '@mui/icons-material/FilterList';
class Categorydrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      selectedcat: "",
      anchorEl: null, 
    };
  }

  componentDidMount() {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => this.setState({ categories: res.data }))
      .catch((err) => alert(`Error : ${err}`));
  }

  handlechange = (e) => {
    const cat = e.target.value;
    this.setState({ selectedcat: cat });
    this.props.oncatchange(cat);
  };

  render() {
    const { categories } = this.state;

    return (
      <Paper elevation={4} sx={{ display: "inline-block" }}>
        <Box sx={{ p: "5px" }}>
          <Button
            variant="contained"
            onClick={(e) => this.setState({ anchorEl: e.currentTarget })}
            sx={{
              textTransform: "none",
              bgcolor: "#00004d",
              "&:hover": { bgcolor: "#000080" },
              fontFamily:"sans-serif",
              fontWeight:"bold"
            }}
          >
           <FilterListIcon sx={{mr:"10px"}}/>Filter
          </Button>

          <Menu
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={() => this.setState({ anchorEl: null })}
          >
            <MenuItem
              onClick={() => {
                this.setState({ selectedcat: " ", anchorEl: null });
                this.handlechange({ target: { value: "" } });
              }}
            >
              ALL
            </MenuItem>

            {categories.map((cat) => (
              <MenuItem
                key={cat}
                onClick={() => {
                  this.setState({ selectedcat: cat, anchorEl: null });
                  this.handlechange({ target: { value: cat } });
                }}
              >
                {cat.toUpperCase()}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Paper>
    );
  }
}

export default Categorydrop;
