import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Routers } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context.jsx";

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Routers>
      <AuthProviderWrapper>
    <App />
    </AuthProviderWrapper>
    </Routers>
  </StrictMode>,
  
)
