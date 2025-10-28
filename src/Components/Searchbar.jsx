import { TextField,Box,Button,ButtonGroup,Paper} from '@mui/material'
import React, { Component } from 'react'
import SearchIcon from '@mui/icons-material/Search';
class Searchbar extends Component {
  render() {
    return (
<Box sx={{display: "flex",justifyContent:"center",alignItems:"center"}}>
<Paper elevation={2}>
    <ButtonGroup>
      <TextField variant='outlined' placeholder='Search for Products,Brands and More' type='search' size='medium' color='inherit' sx={{width:"600px",borderRadius:"50px"}}/>
       <Button variant='contained' color='inherit' ><SearchIcon/></Button>
       </ButtonGroup>
       </Paper>
  </Box>

  
    )
  }
}
export default  Searchbar 

//button radius and search bar radius