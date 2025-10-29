import { Box, FormControl, InputLabel, Select, MenuItem ,Toolbar, Paper} from '@mui/material';
import React, { Component } from 'react'
import axios from 'axios'
class Categorydrop extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       categories:[],
       selectedcat:''
    }
  }
  componentDidMount(){
      axios.get('https://fakestoreapi.com/products/categories')
      .then(res => this.setState({
        categories:res.data
      }))
      .catch(err => alert(`Error : ${err}`))
  }
  
  handlechange = (e) => {
    const cat=e.target.value
    this.setState({
        selectedcat:e.target.value
    })
    this.props.oncatchange(cat)
  }
  
    render() {
        const{categories}=this.state
    return (
        <>
        
                <Paper elevation={4}>
      <Box sx={{p:"5px" ,width:"200px"}}>
        <FormControl fullWidth>
           <InputLabel>Category</InputLabel>
               <Select value={this.state.selectedcat} label="Category" onChange={this.handlechange} size='medium' color='inherit'>
                   <MenuItem value=" ">All</MenuItem>
                   {categories .map( cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </Select>
</FormControl>
</Box>
</Paper>
</>
    )
  }
}

export default  Categorydrop
