
import { BrowserRouter,  Routes, Route  } from "react-router-dom"

import SignUpPage from "./pages/SignUpPage"
import WhatIWant from "./pages/WhatIWant"

import { CssBaseline } from "@mui/material"

import MapPage from "./pages/Map"
import Restaurant from "./pages/Restaurant"
import MealsPage from "./pages/MealsPage"
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
            <Route path ="/meals" element= {<MealsPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
