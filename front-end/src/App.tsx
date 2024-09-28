
import { BrowserRouter, Navigate, Routes, Route  } from "react-router-dom"
import { UseSelector } from "react-redux"
import SignUpPage from "./pages/SignUpPage"
function App() {
  

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<SignUpPage/>} />
        
 
        </Routes>
      </BrowserRouter>
    </div>

    
  )
}

export default App
