import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home.jsx'
import Courses from './Pages/Courses.jsx'
import CourseDetail from './Pages/CourseDetail.jsx'
import Wishlist from './Pages/Wishlist.jsx'
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import Cart from './Pages/Cart.jsx'
import Checkout from './Pages/Checkout.jsx'
import Footer from './Components/Footer'
import Preloader from './Components/Preloader.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/coursedetail" element={<CourseDetail />} />
          <Route path="/coursedetail/:id" element={<CourseDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
