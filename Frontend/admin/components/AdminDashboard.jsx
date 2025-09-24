// import React, { useState, useEffect } from 'react';
// import { fetchApi } from '../config/api';
// import ProductManagement from './admin/ProductManagement';
// import UserManagement from './admin/UserManagement';
// import ContentManagement from './admin/ContentManagement';
// import RepairManagement from './admin/RepairManagement';
// import NotificationCenter from './admin/NotificationCenter';
// import AdminSidebar from './admin/AdminSidebar';
// import AdminStats from './admin/AdminStats';
// import '../styles/AdminDashboard.css';

// const AdminDashboard = ({ adminData, onLogout }) => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     pendingRepairs: 0,
//     totalOrders: 0
//   });

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//   try {
//     const [usersResponse, productsResponse, repairsResponse] = await Promise.all([
//       fetchApi('admin_get_users').catch(() => ({users: []})),
//       fetchApi('get_products').catch(() => ({products: []})),
//       fetchApi('admin_get_repairs').catch(() => ({repairs: []}))
//     ]);

//     setStats({
//       totalUsers: usersResponse.users?.length || 0,
//       totalProducts: productsResponse.products?.length || 0,
//       pendingRepairs: repairsResponse.repairs?.filter(r => r.statut === 'en_attente').length || 0,
//       totalOrders: 0
//     });
//   } catch (error) {
//     console.error('Error loading stats:', error);
//     // Set default values
//     setStats({
//       totalUsers: 0,
//       totalProducts: 0,
//       pendingRepairs: 0,
//       totalOrders: 0
//     });
//   }
// };
//   const loadStats = async () => {
//     try {
//       // Load various statistics
//       const [usersResponse, productsResponse, repairsResponse] = await Promise.all([
//         fetchApi('admin_get_users'),
//         fetchApi('get_products'),
//         fetchApi('admin_get_repairs')
//       ]);

//       setStats({
//         totalUsers: usersResponse.users?.length || 0,
//         totalProducts: productsResponse.products?.length || 0,
//         pendingRepairs: repairsResponse.repairs?.filter(r => r.statut === 'en_attente').length || 0,
//         totalOrders: 0 // Will be calculated from orders when available
//       });
//     } catch (error) {
//       console.error('Error loading stats:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await fetchApi('admin_logout');
//       localStorage.removeItem('adminToken');
//       localStorage.removeItem('adminData');
//       onLogout();
//     } catch (error) {
//       console.error('Logout error:', error);
//       // Force logout even if API call fails
//       localStorage.removeItem('adminToken');
//       localStorage.removeItem('adminData');
//       onLogout();
//     }
//   };

//   const renderActiveComponent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <AdminStats stats={stats} />;
//       case 'products':
//         return <ProductManagement />;
//       case 'users':
//         return <UserManagement />;
//       case 'content':
//         return <ContentManagement />;
//       case 'repairs':
//         return <RepairManagement />;
//       case 'notifications':
//         return <NotificationCenter />;
//       default:
//         return <AdminStats stats={stats} />;
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <AdminSidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         adminData={adminData}
//         onLogout={handleLogout}
//       />

//       <div className="admin-main-content">
//         <div className="admin-header">
//           <h1>
//             {activeTab === 'dashboard' && 'Dashboard Overview'}
//             {activeTab === 'products' && 'Product Management'}
//             {activeTab === 'users' && 'User Management'}
//             {activeTab === 'content' && 'Content Management'}
//             {activeTab === 'repairs' && 'Repair Management'}
//             {activeTab === 'notifications' && 'Notification Center'}
//           </h1>
//           <div className="admin-user-info">
//             <span>Welcome, {adminData.username}</span>
//           </div>
//         </div>

//         <div className="admin-content">
//           {renderActiveComponent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useState, useEffect } from 'react';
// import { fetchApi } from '../config/api';
// import ProductManagement from './admin/ProductManagement';
// import UserManagement from './admin/UserManagement';
// import ContentManagement from './admin/ContentManagement';
// import RepairManagement from './admin/RepairManagement';
// import NotificationCenter from './admin/NotificationCenter';
// import AdminSidebar from './admin/AdminSidebar';
// import AdminStats from './admin/AdminStats';
// import '../styles/AdminDashboard.css';

// const AdminDashboard = ({ adminData, onLogout }) => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     pendingRepairs: 0,
//     totalOrders: 0
//   });

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       const [usersResponse, productsResponse, repairsResponse] = await Promise.all([
//         fetchApi('admin_get_users').catch(() => ({users: []})),
//         fetchApi('get_products').catch(() => ({products: []})),
//         fetchApi('admin_get_repairs').catch(() => ({repairs: []}))
//       ]);

//       setStats({
//         totalUsers: usersResponse.users?.length || 0,
//         totalProducts: productsResponse.products?.length || 0,
//         pendingRepairs: repairsResponse.repairs?.filter(r => r.statut === 'en_attente').length || 0,
//         totalOrders: 0
//       });
//     } catch (error) {
//       console.error('Error loading stats:', error);
//       setStats({
//         totalUsers: 0,
//         totalProducts: 0,
//         pendingRepairs: 0,
//         totalOrders: 0
//       });
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await fetchApi('admin_logout');
//       onLogout();
//     } catch (error) {
//       console.error('Logout error:', error);
//       onLogout();
//     }
//   };

//   const renderActiveComponent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <AdminStats stats={stats} />;
//       case 'products':
//         return <ProductManagement />;
//       case 'users':
//         return <UserManagement />;
//       case 'content':
//         return <ContentManagement />;
//       case 'repairs':
//         return <RepairManagement />;
//       case 'notifications':
//         return <NotificationCenter />;
//       default:
//         return <AdminStats stats={stats} />;
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <AdminSidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         adminData={adminData}
//         onLogout={handleLogout}
//       />

//       <div className="admin-main-content">
//         <div className="admin-header">
//           <h1>
//             {activeTab === 'dashboard' && 'Dashboard Overview'}
//             {activeTab === 'products' && 'Product Management'}
//             {activeTab === 'users' && 'User Management'}
//             {activeTab === 'content' && 'Content Management'}
//             {activeTab === 'repairs' && 'Repair Management'}
//             {activeTab === 'notifications' && 'Notification Center'}
//           </h1>
//           <div className="admin-user-info">
//             <span>Welcome, {adminData?.username}</span>
//           </div>
//         </div>

//         <div className="admin-content">
//           {renderActiveComponent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useState, useEffect } from "react";
// import { fetchApi } from "../../src/config/api";
// import ProductManagement from "../ProductManagement";
// import UserManagement from "../UserManagement";
// import ContentManagement from "../ContentManagement";
// import RepairManagement from "../RepairManagement";
// import NotificationCenter from "../NotificationCenter";
// import AdminSidebar from "./AdminSidebar";
// import AdminStats from "../AdminStats";
// import "../styles/AdminDashboard.css";

// const AdminDashboard = ({ adminData, onLogout }) => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     pendingRepairs: 0,
//     totalOrders: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       const [usersResponse, productsResponse, repairsResponse] =
//         await Promise.all([
//           fetchApi("admin_get_users").catch(() => ({ users: [] })),
//           fetchApi("get_products").catch(() => ({ products: [] })),
//           fetchApi("admin_get_repairs").catch(() => ({ repairs: [] })),
//         ]);

//       setStats({
//         totalUsers: usersResponse.users?.length || 0,
//         totalProducts: productsResponse.products?.length || 0,
//         pendingRepairs:
//           repairsResponse.repairs?.filter((r) => r.statut === "en_attente")
//             .length || 0,
//         totalOrders: 0,
//       });
//     } catch (error) {
//       console.error("Error loading stats:", error);
//       setStats({
//         totalUsers: 0,
//         totalProducts: 0,
//         pendingRepairs: 0,
//         totalOrders: 0,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await fetchApi("admin_logout");
//       onLogout();
//     } catch (error) {
//       console.error("Logout error:", error);
//       onLogout();
//     }
//   };

//   const renderActiveComponent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return <AdminStats stats={stats} />;
//       case "products":
//         return <ProductManagement />;
//       case "users":
//         return <UserManagement />;
//       case "content":
//         return <ContentManagement />;
//       case "repairs":
//         return <RepairManagement />;
//       case "notifications":
//         return <NotificationCenter />;
//       default:
//         return <AdminStats stats={stats} />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="admin-loading">
//         <div className="loading-spinner">Loading dashboard...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-dashboard">
//       <AdminSidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         adminData={adminData || {}}
//         onLogout={handleLogout}
//       />

//       <div className="admin-main-content">
//         <div className="admin-header">
//           <h1>
//             {activeTab === "dashboard" && "Dashboard Overview"}
//             {activeTab === "products" && "Product Management"}
//             {activeTab === "users" && "User Management"}
//             {activeTab === "content" && "Content Management"}
//             {activeTab === "repairs" && "Repair Management"}
//             {activeTab === "notifications" && "Notification Center"}
//           </h1>
//           <div className="admin-user-info">
//             <span>Welcome, {adminData?.username || "Admin"}</span>
//           </div>
//         </div>

//         <div className="admin-content">{renderActiveComponent()}</div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useState, useEffect } from "react";
import { Users, Package, Tool, DollarSign, TrendingUp, Clock } from "react-feather";
import styles from "../styles/AdminDashboard.module.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_products: 0,
    total_repairs: 0,
    pending_repairs: 0,
    total_revenue: 0,
    recent_orders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/Backend/admin_routes.php?action=get_dashboard_stats', {
        credentials: 'include'
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStats(result.data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.total_users,
      icon: Users,
      color: "#3b82f6",
      bgColor: "#dbeafe"
    },
    {
      title: "Total Products",
      value: stats.total_products,
      icon: Package,
      color: "#10b981",
      bgColor: "#d1fae5"
    },
    {
      title: "Total Repairs",
      value: stats.total_repairs,
      icon: Tool,
      color: "#f59e0b",
      bgColor: "#fef3c7"
    },
    {
      title: "Pending Repairs",
      value: stats.pending_repairs,
      icon: Clock,
      color: "#ef4444",
      bgColor: "#fee2e2"
    },
    {
      title: "Total Revenue",
      value: `€${parseFloat(stats.total_revenue).toFixed(2)}`,
      icon: DollarSign,
      color: "#8b5cf6",
      bgColor: "#ede9fe"
    },
    {
      title: "Recent Orders",
      value: stats.recent_orders,
      icon: TrendingUp,
      color: "#06b6d4",
      bgColor: "#cffafe"
    }
  ];

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Dashboard Overview</h1>
        <p>Welcome to the admin panel. Here's what's happening with your business.</p>
      </div>

      <div className={styles.statsGrid}>
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: card.bgColor }}>
                <Icon size={24} style={{ color: card.color }} />
              </div>
              <div className={styles.statContent}>
                <h3>{card.value}</h3>
                <p>{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <div className={styles.actionCard}>
            <Package size={32} />
            <h3>Add New Product</h3>
            <p>Add a new product to your catalog</p>
            <button onClick={() => window.location.href = '/admin/products'}>
              Go to Products
            </button>
          </div>
          
          <div className={styles.actionCard}>
            <Users size={32} />
            <h3>Manage Users</h3>
            <p>View and manage user accounts</p>
            <button onClick={() => window.location.href = '/admin/users'}>
              Go to Users
            </button>
          </div>
          
          <div className={styles.actionCard}>
            <Tool size={32} />
            <h3>Check Repairs</h3>
            <p>Review and update repair requests</p>
            <button onClick={() => window.location.href = '/admin/repairs'}>
              Go to Repairs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
