import './App.css';
import Layout from './Components/Layout';
import React from 'react';
import { lazy,Suspense} from 'react';
// import Product from './Pages/Product'
const LazyProduct = lazy(() => import('./Pages/Product'));
// const LazyProduct = React.lazy(() =>
//   new Promise(resolve =>
//     setTimeout(() => resolve(import('./Pages/Product')), 3000)
//   )
// );
const LazyCart=lazy(() => import('./Pages/Cart'))
const LazyProductDetail = lazy(() => import('./Pages/ProductDetail'));
import Homepage from './Pages/Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import { Box, Toolbar } from '@mui/material';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function App() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ flex: '1' }}>
          <BrowserRouter>
            <Layout />
            <Routes>
              <Route
                path="/"
                element={
                  <Box sx={{ width: '100%', overflowX: 'hidden' }}>
                    <Homepage />
                  </Box>
                }
              />
              <Route
                path="products"
                element={
                  <Suspense fallback={ <div style={{
                          padding: 20,
                          background: 'yellow',
                          width: '100dvw',
                          height: '100dvh',
                          textAlign: 'center',
                          color: 'red',
                        }}
                      >
                        Loading...
                      </div>
                    }
                  >
                    <LazyProduct />
                  </Suspense>
                }
              />
              <Route path="/product/:id" element={<Suspense fallback={ <div style={{
                          padding: 20,
                          background: 'yellow',
                          width: '100dvw',
                          height: '100dvh',
                          textAlign: 'center',
                          color: 'red',
                        }}
                      >
                        Loading...
                      </div>
                    }  ><LazyProductDetail /></Suspense>} />
              <Route
                path="cart"
                element={<Suspense fallback={ <div style={{
                          padding: 20,
                          background: 'yellow',
                          width: '100dvw',
                          height: '100dvh',
                          textAlign: 'center',
                          color: 'red',
                        }}
                      >
                        Loading...
                      </div>
                    }>
                  <ProtectedRoute>
                    <LazyCart/>
                  </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route path="login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
export default App;
