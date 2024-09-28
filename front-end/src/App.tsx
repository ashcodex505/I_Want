
import { BrowserRouter, Navigate, Routes, Route  } from "react-router-dom"
import { UseSelector } from "react-redux"
import SignUpPage from "./pages/SignUpPage"
import { CssBaseline } from "@mui/material"
function App() {
  

  return (
    <div className="app" style={{backgroundColor: '#282828' , height: '100vh', width: '100vw', margin: 0, padding: 0   }}>
      <BrowserRouter>
      <CssBaseline/>
        <Routes>
          <Route path = "/" element = {<SignUpPage/>} />
        
 
        </Routes>
      </BrowserRouter>
    </div>

    
  )
}

export default App
