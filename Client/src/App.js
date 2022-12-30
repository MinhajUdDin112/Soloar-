import React from 'react'
import Home from './pages/Home'
import Imagepage from './pages/Imagepage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/imagepage" element={<Imagepage/>}></Route>
      </Routes>
    </Router>
  )
}

export default App

