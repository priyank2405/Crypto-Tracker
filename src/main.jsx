import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CryptoContextProvider from './Context/CryptoContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CryptoContextProvider>
    <App />
  </CryptoContextProvider>
  </BrowserRouter>
)
