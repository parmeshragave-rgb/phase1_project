import React, { Component } from 'react';
import Searchbar from '../Components/Searchbar';
import {
  Toolbar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
} from '@mui/material';
import axios from 'axios';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        const data = res.data;
        const categoryMap = {};

        data.forEach((item) => {
          if (!categoryMap[item.category]) {
            categoryMap[item.category] = [];
          }
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
    console.log('Clicked product ID:', id);
  };

  render() {
    const { categories } = this.state;

    return (
      <>
        <Searchbar />
        <Toolbar />
        {categories.map((category) => (
          <Box key={category.name} sx={{ my: 4, px: 4 }}>
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: 'bold', textTransform: 'capitalize' }}
            >
              {category.name}
            </Typography>

            <Grid container spacing={2} justifyContent="center">
  {category.items.slice(0, 4).map((product) => (
    <Grid item xs={12} sm={6} md={3} key={product.id}>
      <Box>
        <Card
          onClick={() => this.clickhandler(product.id)}
          
            sx={ { height: 400, width:280, display: "flex", 
              flexDirection: "column",justifyContent: "space-between",pt:0,pb:0
          }}
        >
          <CardMedia component="img" height="200" image={product.image}  sx={{ objectFit: "contain", p: 2 }}/>
          <CardContent sx={{flexGrow:1}}>
                            <Typography variant='h6' >{product.title.substring(0,40)}</Typography>
                            <Typography variant='body1' sx={{fontFamily:"sans-serif", fontWeight:"bold"}}>₹.{product.price}</Typography>
                            
          </CardContent>
      
        </Card>
      </Box>
    </Grid>
  ))}
</Grid>

          </Box>
        ))}
      </>
    );
  }
}

export default Homepage;
