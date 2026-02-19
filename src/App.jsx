import './App.css'
import { Route, Routes } from 'react-router-dom'
import {Home} from "./Pages/Home"
import Crypto from "./Pages/Crypto"

function App() {

  return (
    <div className="app">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crypto/:cryptoId" element={<Crypto/>} />
    </Routes>

    </div>
  )
}

export default App
