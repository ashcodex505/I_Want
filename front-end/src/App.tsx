
import { BrowserRouter, Navigate, Routes, Route  } from "react-router-dom"
import { UseSelector } from "react-redux"
import SignUpPage from "./pages/SignUpPage"
import WhatIWant from "./pages/WhatIWant"
import HomePage from "./pages/Map"
import { CssBaseline } from "@mui/material"
import ProtectedRoute from "./ProtectedRoute"
import MapPage from "./pages/Map"
import Restaurant from "./pages/Restaurant"
function App() {
  

  return (
    <div className="app"  style={{
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      backgroundColor: '#819DDA', // Set the background color here
    }} >
      <BrowserRouter>
      <CssBaseline/>
        <Routes>
          <Route path = "/" element = {<SignUpPage/>} />
          <Route path = "/want" element = {<WhatIWant/>} />
      
            <Route path = "/map" element = {<MapPage/>}/>
            <Route path = "/restaurant" element = {<Restaurant/>} />
        </Routes>
      </BrowserRouter>
    </div>

    
  )
}

export default App
