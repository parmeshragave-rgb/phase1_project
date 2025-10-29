import React, { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Toolbar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  Paper,
  InputAdornment,
  Button,
} from '@mui/material';
import { motion } from "framer-motion";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      searchQuery: '',
    };
  }

  componentDidMount() {
    axios
      .get('https://fakestoreapi.com/products')
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

        this.setState({ categories });
      })
      .catch((err) => alert(`Error: ${err}`));
  }

  clickhandler = (id) => {
    this.props.navigate(`/product/${id}`);
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearchClick = () => {
    const query = this.state.searchQuery.trim();
    if (query) {
    
      this.props.navigate(`/products?search=${encodeURIComponent(query)}`);
    } else {
      alert("Please enter a search term!");
    }
  };

  render() {
    const { categories, searchQuery } = this.state;

    return (
      <>
        
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              px: 4,
              mb: 3,
              mt: '135px',
              justifyContent: 'center',
              display: 'flex',
            }}
            width="100%"
          >
            <Paper
              elevation={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: '50px',
                width: { xs: '85%', sm: '75%', md: '65%', lg: '50%' },
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Search for Products, Brands and More"
                fullWidth
                value={searchQuery}
                onChange={this.handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{ ml: 1, mr: 1, color: 'text.secondary' }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                    backgroundColor: '#fff',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': { border: 'none' },
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  ml: 2,
                  px: 3,
                  py: 1,
                  borderRadius: '50px',
                  textTransform: 'none',
                }}
                onClick={this.handleSearchClick}
              >
                Search
              </Button>
            </Paper>
          </Box>
        </motion.div>

        
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            my: 6,
            position: "relative",
            backgroundColor: "#fafafa",
            py: 2,
          }}
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 100, 
              ease: "linear",
            }}
            style={{
              display: "flex",
              width: "max-content",
            }}
          >
            {[...this.state.categories.flatMap((cat) => cat.items).slice(0, 15),
              ...this.state.categories.flatMap((cat) => cat.items).slice(0, 15)
            ].map((product, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: "260px",
                  height: "180px",
                  borderRadius: "15px",
                  overflow: "hidden",
                  mx: 1.5,
                  boxShadow: 3,
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1,
                  textAlign: "center",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    marginBottom: "10px",
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    color: "text.secondary",
                    textTransform: "capitalize",
                  }}
                >
                  {product.category}
                </Typography>
              </Box>
            ))}
          </motion.div>
        </Box>

        
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <Box sx={{ my: 4, px: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif',
                  fontStyle: 'italic',
                }}
              >
                {category.name.toUpperCase()}
              </Typography>

              <Grid container spacing={3} justifyContent="center">
                {category.items.slice(0, 4).map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <Card
                        onClick={() => this.clickhandler(product.id)}
                        sx={{
                          height: 400,
                          width: 280,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          boxShadow: 4,
                          borderRadius: 3,
                          backgroundColor: '#fff',
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={product.image}
                          sx={{
                            objectFit: 'contain',
                            p: 2,
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'scale(1.05)' },
                          }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6">
                            {product.title.substring(0, 40)}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: 'sans-serif',
                              fontWeight: 'bold',
                            }}
                          >
                            ₹.{product.price}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
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
