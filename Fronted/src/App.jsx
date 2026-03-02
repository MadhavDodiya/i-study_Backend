import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home.jsx';
import Courses from './Pages/Courses.jsx';
import CourseDetail from './Pages/CourseDetail.jsx';
import Wishlist from './Pages/Wishlist.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import Cart from './Pages/Cart.jsx';
import Checkout from './Pages/Checkout.jsx';
import Footer from './Components/Footer';
import Preloader from './Components/Preloader.jsx';

// ✅ Admin imports
import AdminLayout from './Components/Admin/AdminLayout';

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
    <BrowserRouter>
      <Routes>
        {/* ✅ Admin Routes - With built-in auth */}
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminLayout children={null} />} />
              </Routes>
            </AdminLayout>
          }
        />

        {/* ✅ Regular user routes */}
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/courses" element={
          <>
            <Header />
            <Courses />
            <Footer />
          </>
        } />
        <Route path="/coursedetail/:id" element={
          <>
            <Header />
            <CourseDetail />
            <Footer />
          </>
        } />
        <Route path="/wishlist" element={
          <>
            <Header />
            <Wishlist />
            <Footer />
          </>
        } />
        <Route path="/cart" element={
          <>
            <Header />
            <Cart />
            <Footer />
          </>
        } />
        <Route path="/checkout" element={
          <>
            <Header />
            <Checkout />
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* ✅ Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;