import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='123374605242-39oe6nminamp3ca15catqg28jgoc3k7d.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
