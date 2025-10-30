import { Box, Paper, Button, Menu, MenuItem } from "@mui/material";
import React, { Component } from "react";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterList";

class Categorydrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      selectedcat: "",
      anchorEl: null,
      filter:"Filter"
    };
  }

  componentDidMount() {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => this.setState({ categories: res.data }))
      .catch((err) => alert(`Error: ${err}`));
  }

  handlechange = (e) => {
    const cat = e.target.value;
    this.setState({ selectedcat: cat ,filter:cat});
    this.props.oncatchange(cat);
  };

  render() {
    const { categories, anchorEl } = this.state;

    return (
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fff",
          borderRadius: "30px",
          ml: { xs: 0, sm: 2 },
          px: { xs: 1, sm: 1.5 },
          py: { xs: 0.5, sm: 0.8 },
          boxShadow: 2,
          transition: "all 0.3s ease-in-out",
          "&:hover": { boxShadow: 4 },
        }}
      >
        <Button
          variant="contained"
          onClick={(e) => this.setState({ anchorEl: e.currentTarget })}
          sx={{
            textTransform: "none",
            bgcolor: "#00004d",
            "&:hover": { bgcolor: "#000080", transform: "scale(1.03)" },
            fontFamily: "sans-serif",
            fontWeight: "bold",
            outline: "none",
            border: "none",
            borderRadius: "25px",
            px: { xs: 2, sm: 3 },
            py: { xs: 0.6, sm: 0.9 },
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FilterListIcon />
          {this.state.filter}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.setState({ anchorEl: null })}
          PaperProps={{
            sx: {
              borderRadius: "12px",
              mt: 1,
              boxShadow: 3,
            },
          }}
        >
          <MenuItem
            onClick={() => {
              this.setState({ anchorEl: null, filter:"Filter" });
              this.handlechange({ target: { value: "" } });

            }}
          >
            ALL
          </MenuItem>

          {categories.map((cat) => (
            <MenuItem
              key={cat}
              onClick={() => {
                this.setState({ anchorEl: null });
                this.handlechange({ target: { value: cat } });
              }}
            >
              {cat.toUpperCase()}
            </MenuItem>
          ))}
        </Menu>
      </Paper>
    );
  }
}

export default Categorydrop;
