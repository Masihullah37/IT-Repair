// import React from 'react';
// import '../../styles/AdminSidebar.css';

// const AdminSidebar = ({ activeTab, setActiveTab, adminData, onLogout }) => {
//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//     { id: 'products', label: 'Products', icon: '📦' },
//     { id: 'users', label: 'Users', icon: '👥' },
//     { id: 'content', label: 'Content', icon: '📝' },
//     { id: 'repairs', label: 'Repairs', icon: '🔧' },
//     { id: 'notifications', label: 'Notifications', icon: '🔔' }
//   ];

//   return (
//     <div className="admin-sidebar">
//       <div className="admin-sidebar-header">
//         <div className="admin-logo">
//           <h2>IT Repairs</h2>
//           <span>Admin Panel</span>
//         </div>
//       </div>

//       <nav className="admin-nav">
//         {menuItems.map(item => (
//           <button
//             key={item.id}
//             className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
//             onClick={() => setActiveTab(item.id)}
//           >
//             <span className="nav-icon">{item.icon}</span>
//             <span className="nav-label">{item.label}</span>
//           </button>
//         ))}
//       </nav>

//       <div className="admin-sidebar-footer">
//         <div className="admin-profile">
//           <div className="profile-info">
//             <strong>{adminData.username}</strong>
//             <small>{adminData.role}</small>
//           </div>
//         </div>
//         <button className="logout-btn" onClick={onLogout}>
//           <span>🚪</span> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

// import React from 'react';
// import '../../styles/AdminSidebar.css';

// const AdminSidebar = ({ activeTab, setActiveTab, adminData, onLogout }) => {
//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//     { id: 'products', label: 'Products', icon: '📦' },
//     { id: 'users', label: 'Users', icon: '👥' },
//     { id: 'content', label: 'Content', icon: '📝' },
//     { id: 'repairs', label: 'Repairs', icon: '🔧' },
//     { id: 'notifications', label: 'Notifications', icon: '🔔' }
//   ];

//   return (
//     <div className="admin-sidebar">
//       <div className="admin-sidebar-header">
//         <div className="admin-logo">
//           <h2>IT Repairs</h2>
//           <span>Admin Panel</span>
//         </div>
//       </div>

//       <nav className="admin-nav">
//         {menuItems.map(item => (
//           <button
//             key={item.id}
//             className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
//             onClick={() => setActiveTab(item.id)}
//           >
//             <span className="nav-icon">{item.icon}</span>
//             <span className="nav-label">{item.label}</span>
//           </button>
//         ))}
//       </nav>

//       <div className="admin-sidebar-footer">
//         <div className="admin-profile">
//           <div className="profile-info">
//             <strong>{adminData?.username || 'Admin'}</strong>
//             <small>{adminData?.role || 'Administrator'}</small>
//           </div>
//         </div>
//         <button className="logout-btn" onClick={onLogout}>
//           <span>🚪</span> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Package,
  Tool,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "react-feather";
import styles from "../styles/AdminSidebar.module.css";

function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", icon: Home, label: "Dashboard" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/repairs", icon: Tool, label: "Repairs" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <Shield size={32} />
          {!isCollapsed && <span>Admin Panel</span>}
        </div>
        <button onClick={toggleSidebar} className={styles.toggleButton}>
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className={styles.sidebarNav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <Icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// Import Shield icon
import { Shield } from "react-feather";

export default AdminSidebar;