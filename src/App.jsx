import './App.css' 
import Layout from './Components/Layout'
import Product from './Pages/Product'
import ProductDetail from './Pages/ProductDetail';
import Homepage from './Pages/Homepage';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import { Box } from '@mui/material';


function App() 

{ 
  return ( 
  <> 
  
  
  <BrowserRouter>
<Layout/> 
      <Routes>
           <Route path="/" element={ <Box sx={{width:"100%",overflowX:"hidden"}}><Homepage /></Box>}  />
           <Route path="products" element={<Product/>}></Route>
            <Route path="/product/:id" element={<ProductDetail/>} />
           <Route path="cart" element={<Cart/>} />
            <Route path="login" element={<Login />} />
      
            
      </Routes>
 
</BrowserRouter>

  </> 
  ) 
} 
export default App