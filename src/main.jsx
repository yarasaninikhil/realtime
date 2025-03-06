import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <GoogleOAuthProvider clientId="862185140769-68ua79emn921ovlkhrmuuhgctbg7edla.apps.googleusercontent.com">
    <Router>
      <App />
    </Router>
      
      </GoogleOAuthProvider>
  </StrictMode>
)
