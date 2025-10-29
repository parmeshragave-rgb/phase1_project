import './App.css' 
import Layout from './Components/Layout'
import Product from './Pages/Product'
import ProductDetail from './Pages/ProductDetail';
import Homepage from './Pages/Homepage';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Cart from './Pages/Cart';

function App() 

{ 
  return ( 
  <> 
  <BrowserRouter>
<Layout/> 
      <Routes>
           <Route path="/" element={<Homepage />} />
           <Route path="products" element={<Product/>}></Route>
            <Route path="/product/:id" element={<ProductDetail/>} />
           <Route path="cart" element={<Cart/>} />

      </Routes>
 {/* </Layout>       */}
</BrowserRouter>

  </> 
  ) 
} 
export default App