import React, { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {Toolbar,Grid,Card,CardMedia,CardContent,CardActions,Typography,Box,
  Button,TextField,ButtonGroup,Paper} from '@mui/material';
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

        this.setState({ categories:categories});
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
        
        <Box sx={{ px: 4, mb: 3 ,mt:"135px",justifyContent:"center"}} width="100%">
        
          <ButtonGroup sx={{justifyContent:"center"}}>
            <TextField variant='outlined' placeholder='Search for Products,Brands and More' type='search' size='medium' color='inherit' sx={{width:"400px",borderRadius:"50px"}}/>
             <Button variant='contained' color='inherit' ><SearchIcon/></Button>
             </ButtonGroup>
            
             </Box>
      
        {categories.map((category) => (
          <Box key={category.name} sx={{ my: 4, px: 4 }}>
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: 'bold',fontFamily:"sans-serif"}}
            >
              {category.name.toUpperCase()}
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
