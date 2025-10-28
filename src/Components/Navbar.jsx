import React, { Component } from 'react';
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";

class Navbar extends Component {
   navhandler = () =>{
    this.props.navigate('/products');
   }

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
            <Button variant="text" color='inherit' sx={{fontFamily:"sans-serif",fontWeight:"bold"}} onClick={this.navhandler}>Shop</Button>
            <Button variant="text" color='inherit'sx={{fontFamily:"sans-serif",fontWeight:"bold"}}>Account</Button>
            <Button variant="text" color='inherit'sx={{fontFamily:"sans-serif",fontWeight:"bold"}}>Cart</Button>
            <Button variant="text" color='inherit'sx={{fontFamily:"sans-serif",fontWeight:"bold"}}>Catagerios</Button>
            
          </Stack>
        </Toolbar>
      </AppBar>
    );
  }
}
function NavWrapper(){
const navigate=useNavigate()
return (<Navbar navigate={navigate}/>)

}
export default NavWrapper
