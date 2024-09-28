
import { BrowserRouter, Navigate, Routes, Route  } from "react-router-dom"
import { UseSelector } from "react-redux"
import SignUpPage from "./pages/SignUpPage"
import WhatIWant from "./pages/WhatIWant"
function App() {
  

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<SignUpPage/>} />
          <Route path = "/want" element = {<WhatIWant/>} />
        </Routes>
      </BrowserRouter>
    </div>

    
  )
}

export default App
