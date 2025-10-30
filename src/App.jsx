import './App.css' 
import Layout from './Components/Layout'
import Product from './Pages/Product'
import ProductDetail from './Pages/ProductDetail';
import Homepage from './Pages/Homepage';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import { Box ,Toolbar} from '@mui/material';
import Footer from './Components/Footer';


function App() 

{ 
  return ( 
  <> 
  
  <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  }}
>
  
  
  <Box sx={{ flex: "1" }}>
    

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

</Box>
  <Footer />
</Box>

  

  </> 
  ) 
} 
export default App