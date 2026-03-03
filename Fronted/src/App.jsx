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

import AdminLayout from './Components/Admin/AdminLayout';
import Dashboard from './Pages/Admin/Dashboard.jsx';
import UserManagement from './Pages/Admin/UserManagement.jsx';
import CourseManagement from './Pages/Admin/CourseManagement.jsx';
import OrderManagement from './Pages/Admin/OrderManagement.jsx';

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
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminLayout>
              <CourseManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminLayout>
              <OrderManagement />
            </AdminLayout>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/courses"
          element={
            <>
              <Header />
              <Courses />
              <Footer />
            </>
          }
        />
        <Route
          path="/coursedetail/:id"
          element={
            <>
              <Header />
              <CourseDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/wishlist"
          element={
            <>
              <Header />
              <Wishlist />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
