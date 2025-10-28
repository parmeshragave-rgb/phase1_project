import './App.css' 
import Layout from './Components/Layout'
import Product from './Pages/Product'
import ProductDetail from './Pages/ProductDetail';
import { BrowserRouter,Route,Routes } from "react-router-dom";

function App() 

{ 
  return ( 
  <> 
  <BrowserRouter>
<Layout> 
      <Routes>
           <Route path="products" element={<Product/>}></Route>
            <Route path="/product/:id" element={<ProductDetail/>} />
      </Routes>
 </Layout>      
</BrowserRouter>

  </> 
  ) 
} 
export default App