

// import React, { useState, useEffect } from 'react';
// import { fetchApi } from '../../config/api';
// import AdminLogin from '../AdminLogin';
// import AdminDashboard from '../AdminDashboard';

// const AdminApp = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [adminData, setAdminData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAdminAuth();
//   }, []);

//   const checkAdminAuth = async () => {
//     try {
//       const response = await fetchApi('admin_check_session');
//       console.log('Session check response:', response);
      
//       if (response.loggedIn) {
//         setIsAuthenticated(true);
//         setAdminData({
//           username: response.username,
//           role: response.role
//         });
//       } else {
//         setIsAuthenticated(false);
//         setAdminData(null);
//       }
//     } catch (error) {
//       console.error('Admin auth check failed:', error);
//       setIsAuthenticated(false);
//       setAdminData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoginSuccess = (admin) => {
//     console.log('Login success:', admin);
//     setIsAuthenticated(true);
//     setAdminData(admin);
//   };

//   const handleLogout = () => {
//     console.log('Logging out');
//     setIsAuthenticated(false);
//     setAdminData(null);
//   };

//   if (loading) {
//     return (
//       <div className="admin-loading">
//         <div className="loading-spinner">Loading admin panel...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-app">
//       {isAuthenticated ? (
//         <AdminDashboard
//           adminData={adminData}
//           onLogout={handleLogout}
//         />
//       ) : (
//         <AdminLogin onLoginSuccess={handleLoginSuccess} />
//       )}
//     </div>
//   );
// };

// export default AdminApp;

// import { Routes, Route, Navigate } from "react-router-dom";
// import { AdminAuthProvider } from "./context/AdminAuthContext";
// import AdminLogin from "./components/AdminLogin";
// import AdminDashboard from "./components/AdminDashboard";
// import AdminLayout from "./components/AdminLayout";
// import UserManagement from "./components/UserManagement";
// import ProductManagement from "./components/ProductManagement";
// import RepairManagement from "./components/RepairManagement";
// import AdminSettings from "./components/AdminSettings";
// import AdminForgotPassword from "./components/AdminForgotPassword";
// import AdminResetPassword from "./components/AdminResetPassword";
// import ProtectedRoute from "./components/ProtectedRoute";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import "./styles/AdminApp.css";

// function AdminApp() {
//   return (
//     <AdminAuthProvider>
//       <div className="admin-app">
//         <ToastContainer position="top-right" />
//         <Routes>
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
//           <Route path="/admin/reset-password" element={<AdminResetPassword />} />
          
//           <Route path="/admin" element={
//             <ProtectedRoute>
//               <AdminLayout />
//             </ProtectedRoute>
//           }>
//             <Route index element={<Navigate to="/admin/dashboard" replace />} />
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="users" element={<UserManagement />} />
//             <Route path="products" element={<ProductManagement />} />
//             <Route path="repairs" element={<RepairManagement />} />
//             <Route path="settings" element={<AdminSettings />} />
//           </Route>
          
//           <Route path="*" element={<Navigate to="/admin/login" replace />} />
//         </Routes>
//       </div>
//     </AdminAuthProvider>
//   );
// }

// export default AdminApp;

import { Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminLayout from "./components/AdminLayout";
import UserManagement from "./components/UserManagement";
import ProductManagement from "./components/ProductManagement";
import RepairManagement from "./components/RepairManagement";
import AdminSettings from "./components/AdminSettings";
import AdminForgotPassword from "./components/AdminForgotPassword";
import AdminResetPassword from "./components/AdminResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/AdminApp.css";

function AdminApp() {
  return (
    <AdminAuthProvider>
      <div className="admin-app">
        <ToastContainer position="top-right" />
        {/* <Routes>
          
          <Route path="login" element={<AdminLogin />} />
          <Route path="forgot-password" element={<AdminForgotPassword />} />
          <Route path="reset-password" element={<AdminResetPassword />} />
        


          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="repairs" element={<RepairManagement />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          
          <Route path="*" element={<Navigate to="login" replace />} />
        </Routes> */}
           <Routes>
      {/* Public admin routes */}
      <Route path="login" element={<AdminLogin />} />
      <Route path="forgot-password" element={<AdminForgotPassword />} />
      <Route path="reset-password" element={<AdminResetPassword />} />

      {/* Protected admin routes */}
      <Route
        path=""
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="repairs" element={<RepairManagement />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
      </div>
    </AdminAuthProvider>
  );
}

export default AdminApp;
// import React, { useState } from 'react';