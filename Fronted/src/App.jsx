import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home.jsx'
import Courses from './Pages/Courses.jsx'
import Footer from './Components/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
