
import { BrowserRouter, Navigate, Routes, Route  } from "react-router-dom"
import { UseSelector } from "react-redux"
import SignUpPage from "./pages/SignUpPage"
import HomePage from "./pages/HomePage"
import { CssBaseline } from "@mui/material"
import ProtectedRoute from "./ProtectedRoute"
function App() {
  

  return (
    <div className="app" style={{backgroundColor: '#282828' , height: '100vh', width: '100vw', margin: 0, padding: 0   }}>
      <BrowserRouter>
      <CssBaseline/>
        <Routes>
          <Route path = "/" element = {<SignUpPage/>} />
          <Route path = "/home" element = {  <HomePage />
              } />
        
 
        </Routes>
      </BrowserRouter>
    </div>

    
  )
}

export default App
