import './App.css' 
import Layout from './Components/Layout'
import Product from './Pages/Product'
import ProductDetail from './Pages/ProductDetail';
import Homepage from './Pages/Homepage';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Cart from './Pages/Cart';
// import Login from './Pages/Login';
// import AuthProvider from './Components/AuthProvider';
// import Requireauth from './Components/Requireauth'
// import Profile from './Pages/Profile';

function App() 

{ 
  return ( 
  <> 
  {/* <AuthProvider> */}
  
  <BrowserRouter>
<Layout/> 
      <Routes>
           <Route path="/" element={<Homepage />} />
           <Route path="products" element={<Product/>}></Route>
            <Route path="/product/:id" element={<ProductDetail/>} />
           <Route path="cart" element={<Cart/>} />
           {/* <Route path="login" element={<Login />} />
      <Route  path='profile'  element={ <Profile/>}/> */}
            
      </Routes>
 
</BrowserRouter>
{/* </AuthProvider> */}
  </> 
  ) 
} 
export default App