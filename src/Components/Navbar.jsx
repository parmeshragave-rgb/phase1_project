import React, { Component } from 'react';
import { AppBar, Badge, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';



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
            <Button variant="text" color='inherit' sx={{fontFamily:"sans-serif",fontWeight:"bold"}} onClick={() => this.props.navigate('/')}>Home</Button>
            <Button variant="text" color='inherit' sx={{fontFamily:"sans-serif",fontWeight:"bold"}} onClick={this.navhandler}>Shop</Button>
           <Badge> <IconButton size="medium" color="inherit" onClick={ () => { this.props.navigate('/cart');}}><ShoppingCartIcon /></IconButton></Badge>
             <Button variant="text" color='inherit'sx={{fontFamily:"sans-serif",fontWeight:"bold"}}><LoginIcon/> Login</Button>
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
