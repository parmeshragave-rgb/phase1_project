import React, { Component } from 'react';
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

class Navbar extends Component {
  render() {
    return (
      <AppBar position="fixed">
                 <Toolbar>
                    <IconButton size="large" color="inherit" >
                        <ShoppingCartIcon />
                    </IconButton>
                    <Typography variant="h4" color="inherit" sx={{flexGrow:1 ,fontFamily:"sans-serif",fontWeight:"bold"}}>
                    ECommerce.
                    </Typography>

          <Stack spacing={2} direction="row">
            <Button variant="text" color='inherit' sx={{fontFamily:"sans-serif",fontWeight:"bold"}}>Home</Button>
            <Button variant="text" color='inherit' sx={{fontFamily:"sans-serif",fontWeight:"bold"}}>Shop</Button>
            <Button variant="text" color='inherit'sx={{fontFamily:"sans-serif",fontWeight:"bold"}}>Account</Button>
            <Button variant="text" color='inherit'sx={{fontFamily:"sans-serif",fontWeight:"bold"}}>Cart</Button>
            <Button variant="text" color='inherit'sx={{fontFamily:"sans-serif",fontWeight:"bold"}}>Catagerios</Button>
            
          </Stack>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
