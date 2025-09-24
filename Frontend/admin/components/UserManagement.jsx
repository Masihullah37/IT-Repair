// import React, { useState, useEffect } from 'react';
// import { fetchApi } from '../../config/api';
// import '../../styles/UserManagement.css';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showResetModal, setShowResetModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newPassword, setNewPassword] = useState('');
//   const [adminFormData, setAdminFormData] = useState({
//   username: '',
//   email: '',
//   password: '',
//   role: 'moderator'
// });

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const response = await fetchApi('admin_get_users');
//       if (response.success) {
//         setUsers(response.users || []);
//       }
//     } catch (error) {
//       console.error('Error loading users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
//       try {
//         await fetchApi(`admin_delete_user?user_id=${userId}`, {
//           method: 'DELETE'
//         });
//         loadUsers(); // Reload users after deletion
//         alert('User deleted successfully');
//       } catch (error) {
//         console.error('Error deleting user:', error);
//         alert('Error deleting user: ' + error.message);
//       }
//     }
//   };

//   const handleResetPassword = async (user) => {
//     setSelectedUser(user);
//     try {
//       const response = await fetchApi(`admin_reset_password?user_id=${user.id}`, {
//         method: 'POST'
//       });

//       if (response.success) {
//         setNewPassword(response.new_password);
//         setShowResetModal(true);
//       }
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       alert('Error resetting password: ' + error.message);
//     }
//   };

//   const handleAddAdmin = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await fetchApi('admin_create_admin', {
//       method: 'POST',
//       body: JSON.stringify(adminFormData)
//     });

//     if (response.success) {
//       alert('Admin user created successfully!');
//       setShowAddAdminModal(false);
//       setAdminFormData({
//         username: '',
//         email: '',
//         password: '',
//         role: 'moderator'
//       });
//     }
//   } catch (error) {
//     console.error('Error creating admin:', error);
//     alert('Error creating admin: ' + error.message);
//   }
// };

//   const filteredUsers = users.filter(user =>
//     user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return <div className="loading">Loading users...</div>;
//   }

//   return (
//     <div className="user-management">
//       <div className="user-header">
//         <h2>User Management</h2>
//         <div className="user-stats">
//           <span className="stat-badge">Total Users: {users.length}</span>
//         </div>
//       </div>

//       <div className="user-controls">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search users by name or email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           <span className="search-icon">🔍</span>
//         </div>
//       </div>

//       <div className="users-table-container">
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Created</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map(user => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>
//                   <div className="user-name">
//                     <strong>{user.prenom} {user.nom}</strong>
//                   </div>
//                 </td>
//                 <td>{user.email}</td>
//                 <td>{user.telephone || 'N/A'}</td>
//                 <td>{new Date(user.created_at).toLocaleDateString()}</td>
//                 <td>
//                   <div className="action-buttons">
//                     <button
//                       className="btn-reset"
//                       onClick={() => handleResetPassword(user)}
//                       title="Reset Password"
//                     >
//                       🔑
//                     </button>
//                     <button
//                       className="btn-delete"
//                       onClick={() => handleDeleteUser(user.id)}
//                       title="Delete User"
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filteredUsers.length === 0 && (
//           <div className="no-users">
//             <p>No users found matching your search.</p>
//           </div>
//         )}
//       </div>

//       {showResetModal && (
//         <div className="modal-overlay">
//           <div className="modal-content reset-modal">
//             <div className="modal-header">
//               <h3>Password Reset Successful</h3>
//               <button className="close-btn" onClick={() => setShowResetModal(false)}>×</button>
//             </div>

//             <div className="modal-body">
//               <p>Password has been reset for:</p>
//               <strong>{selectedUser.prenom} {selectedUser.nom}</strong>
//               <br />
//               <em>{selectedUser.email}</em>

//               <div className="new-password-display">
//                 <label>New Password:</label>
//                 <div className="password-box">
//                   <code>{newPassword}</code>
//                   <button
//                     className="copy-btn"
//                     onClick={() => navigator.clipboard.writeText(newPassword)}
//                   >
//                     📋 Copy
//                   </button>
//                 </div>
//               </div>

//               <div className="warning">
//                 ⚠️ Please share this password securely with the user.
//               </div>
//             </div>

//             <div className="modal-footer">
//               <button
//                 className="btn-primary"
//                 onClick={() => setShowResetModal(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>

//         <button
//   className="btn-primary"
//   onClick={() => setShowAddAdminModal(true)}
// >
//   👑 Add Admin User
// </button>

// // Add the modal for creating admin users
// {showAddAdminModal && (
//   <div className="modal-overlay">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h3>Add Admin User</h3>
//         <button className="close-btn" onClick={() => setShowAddAdminModal(false)}>×</button>
//       </div>
//       <form onSubmit={handleAddAdmin}>
//         {/* Form fields for username, email, password, role */}
//       </form>
//     </div>
//   </div>
// )}
//       )}
//     </div>
//   );
// };

// export default UserManagement;

// import React, { useState, useEffect } from 'react';
// import { fetchApi } from '../../config/api';
// import '../../styles/UserManagement.css';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showResetModal, setShowResetModal] = useState(false);
//   const [showAddAdminModal, setShowAddAdminModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newPassword, setNewPassword] = useState('');
//   const [adminFormData, setAdminFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'moderator'
//   });

//   useEffect(() => {
//     loadUsers();
//     loadAdmins();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const response = await fetchApi('admin_get_users');
//       if (response.success) {
//         setUsers(response.users || []);
//       }
//     } catch (error) {
//       console.error('Error loading users:', error);
//     }
//   };

//   const loadAdmins = async () => {
//     try {
//       const response = await fetchApi('admin_get_admins');
//       if (response.success) {
//         setAdmins(response.admins || []);
//       }
//     } catch (error) {
//       console.error('Error loading admins:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
//       try {
//         await fetchApi(`admin_delete_user?user_id=${userId}`, {
//           method: 'DELETE'
//         });
//         loadUsers();
//         alert('User deleted successfully');
//       } catch (error) {
//         console.error('Error deleting user:', error);
//         alert('Error deleting user: ' + error.message);
//       }
//     }
//   };

//   const handleResetPassword = async (user) => {
//     setSelectedUser(user);
//     try {
//       const response = await fetchApi(`admin_reset_password?user_id=${user.id}`, {
//         method: 'POST'
//       });

//       if (response.success) {
//         setNewPassword(response.new_password);
//         setShowResetModal(true);
//       }
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       alert('Error resetting password: ' + error.message);
//     }
//   };

//   const handleAddAdmin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetchApi('admin_create_admin', {
//         method: 'POST',
//         body: JSON.stringify(adminFormData)
//       });

//       if (response.success) {
//         alert('Admin user created successfully!');
//         setShowAddAdminModal(false);
//         setAdminFormData({
//           username: '',
//           email: '',
//           password: '',
//           role: 'moderator'
//         });
//         loadAdmins();
//       } else {
//         alert(response.error || 'Failed to create admin user');
//       }
//     } catch (error) {
//       console.error('Error creating admin:', error);
//       alert('Error creating admin: ' + error.message);
//     }
//   };

//   const handleAdminFormChange = (e) => {
//     setAdminFormData({
//       ...adminFormData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const filteredUsers = users.filter(user =>
//     user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return <div className="loading">Loading users...</div>;
//   }

//   return (
//     <div className="user-management">
//       <div className="user-header">
//         <h2>User Management</h2>
//         <div className="user-stats">
//           <span className="stat-badge">Total Users: {users.length}</span>
//           <span className="stat-badge">Total Admins: {admins.length}</span>
//         </div>
//       </div>

//       <div className="user-controls">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search users by name or email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           <span className="search-icon">🔍</span>
//         </div>

//         <button
//           className="btn-primary"
//           onClick={() => setShowAddAdminModal(true)}
//         >
//           👑 Add Admin User
//         </button>
//       </div>

//       {/* Regular Users Table */}
//       <div className="users-section">
//         <h3>Regular Users</h3>
//         <div className="users-table-container">
//           <table className="users-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Created</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map(user => (
//                 <tr key={user.id}>
//                   <td>{user.id}</td>
//                   <td>
//                     <div className="user-name">
//                       <strong>{user.prenom} {user.nom}</strong>
//                     </div>
//                   </td>
//                   <td>{user.email}</td>
//                   <td>{user.telephone || 'N/A'}</td>
//                   <td>{new Date(user.created_at).toLocaleDateString()}</td>
//                   <td>
//                     <div className="action-buttons">
//                       <button
//                         className="btn-reset"
//                         onClick={() => handleResetPassword(user)}
//                         title="Reset Password"
//                       >
//                         🔑
//                       </button>
//                       <button
//                         className="btn-delete"
//                         onClick={() => handleDeleteUser(user.id)}
//                         title="Delete User"
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {filteredUsers.length === 0 && (
//             <div className="no-users">
//               <p>No users found matching your search.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Admin Users Table */}
//       <div className="admins-section">
//         <h3>Admin Users</h3>
//         <div className="users-table-container">
//           <table className="users-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Username</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Last Login</th>
//                 <th>Created</th>
//               </tr>
//             </thead>
//             <tbody>
//               {admins.map(admin => (
//                 <tr key={admin.id}>
//                   <td>{admin.id}</td>
//                   <td>
//                     <div className="user-name">
//                       <strong>{admin.username}</strong>
//                     </div>
//                   </td>
//                   <td>{admin.email}</td>
//                   <td>
//                     <span className={`role-badge ${admin.role}`}>
//                       {admin.role}
//                     </span>
//                   </td>
//                   <td>{admin.last_login ? new Date(admin.last_login).toLocaleDateString() : 'Never'}</td>
//                   <td>{new Date(admin.created_at).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {admins.length === 0 && (
//             <div className="no-users">
//               <p>No admin users found.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Reset Password Modal */}
//       {showResetModal && (
//         <div className="modal-overlay">
//           <div className="modal-content reset-modal">
//             <div className="modal-header">
//               <h3>Password Reset Successful</h3>
//               <button className="close-btn" onClick={() => setShowResetModal(false)}>×</button>
//             </div>

//             <div className="modal-body">
//               <p>Password has been reset for:</p>
//               <strong>{selectedUser.prenom} {selectedUser.nom}</strong>
//               <br />
//               <em>{selectedUser.email}</em>

//               <div className="new-password-display">
//                 <label>New Password:</label>
//                 <div className="password-box">
//                   <code>{newPassword}</code>
//                   <button
//                     className="copy-btn"
//                     onClick={() => navigator.clipboard.writeText(newPassword)}
//                   >
//                     📋 Copy
//                   </button>
//                 </div>
//               </div>

//               <div className="warning">
//                 ⚠️ Please share this password securely with the user.
//               </div>
//             </div>

//             <div className="modal-footer">
//               <button
//                 className="btn-primary"
//                 onClick={() => setShowResetModal(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Admin Modal */}
//       {showAddAdminModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3>Add Admin User</h3>
//               <button className="close-btn" onClick={() => setShowAddAdminModal(false)}>×</button>
//             </div>

//             <form onSubmit={handleAddAdmin} className="admin-form">
//               <div className="form-group">
//                 <label htmlFor="username">Username</label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={adminFormData.username}
//                   onChange={handleAdminFormChange}
//                   required
//                   placeholder="Enter username"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={adminFormData.email}
//                   onChange={handleAdminFormChange}
//                   required
//                   placeholder="Enter email"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={adminFormData.password}
//                   onChange={handleAdminFormChange}
//                   required
//                   placeholder="Enter password"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="role">Role</label>
//                 <select
//                   id="role"
//                   name="role"
//                   value={adminFormData.role}
//                   onChange={handleAdminFormChange}
//                 >
//                   <option value="moderator">Moderator</option>
//                   <option value="admin">Admin</option>
//                   <option value="superadmin">Super Admin</option>
//                 </select>
//               </div>

//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className="btn-secondary"
//                   onClick={() => setShowAddAdminModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-primary">
//                   Create Admin User
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;

// import React, { useState, useEffect } from "react";
// import { fetchApi } from "../../src/config/api";
// import "../../styles/UserManagement.css";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showResetModal, setShowResetModal] = useState(false);
//   const [showAddAdminModal, setShowAddAdminModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newPassword, setNewPassword] = useState("");
//   const [adminFormData, setAdminFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "moderator",
//   });

//   useEffect(() => {
//     loadUsers();
//     loadAdmins();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const response = await fetchApi("admin_get_users");
//       if (response.success) {
//         setUsers(response.users || []);
//       }
//     } catch (error) {
//       console.error("Error loading users:", error);
//     }
//   };

//   const loadAdmins = async () => {
//     try {
//       const response = await fetchApi("admin_get_admins");
//       if (response.success) {
//         setAdmins(response.admins || []);
//       }
//     } catch (error) {
//       console.error("Error loading admins:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (
//       window.confirm(
//         "Are you sure you want to delete this user? This action cannot be undone."
//       )
//     ) {
//       try {
//         await fetchApi(`admin_delete_user?user_id=${userId}`, {
//           method: "DELETE",
//         });
//         loadUsers();
//         alert("User deleted successfully");
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         alert("Error deleting user: " + error.message);
//       }
//     }
//   };

//   const handleResetPassword = async (user) => {
//     setSelectedUser(user);
//     try {
//       const response = await fetchApi(
//         `admin_reset_password?user_id=${user.id}`,
//         {
//           method: "POST",
//         }
//       );

//       if (response.success) {
//         setNewPassword(response.new_password);
//         setShowResetModal(true);
//       }
//     } catch (error) {
//       console.error("Error resetting password:", error);
//       alert("Error resetting password: " + error.message);
//     }
//   };

//   const handleAddAdmin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetchApi("admin_create_admin", {
//         method: "POST",
//         body: JSON.stringify(adminFormData),
//       });

//       if (response.success) {
//         alert("Admin user created successfully!");
//         setShowAddAdminModal(false);
//         setAdminFormData({
//           username: "",
//           email: "",
//           password: "",
//           role: "moderator",
//         });
//         loadAdmins();
//       } else {
//         alert(response.error || "Failed to create admin user");
//       }
//     } catch (error) {
//       console.error("Error creating admin:", error);
//       alert("Error creating admin: " + error.message);
//     }
//   };

//   const handleAdminFormChange = (e) => {
//     setAdminFormData({
//       ...adminFormData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return <div className="loading">Loading users...</div>;
//   }

//   return (
//     <div className="user-management">
//       <div className="user-header">
//         <h2>User Management</h2>
//         <div className="user-stats">
//           <span className="stat-badge">Total Users: {users.length}</span>
//           <span className="stat-badge">Total Admins: {admins.length}</span>
//         </div>
//       </div>

//       <div className="user-controls">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search users by name or email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           <span className="search-icon">🔍</span>
//         </div>

//         <button
//           className="btn-primary add-admin-btn"
//           onClick={() => setShowAddAdminModal(true)}
//         >
//           👑 Add Admin User
//         </button>
//       </div>

//       {/* Regular Users Table */}
//       <div className="users-table-container">
//         <h3 className="section-title">Regular Users</h3>
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Created</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>
//                   <div className="user-name">
//                     <strong>
//                       {user.prenom} {user.nom}
//                     </strong>
//                   </div>
//                 </td>
//                 <td>{user.email}</td>
//                 <td>{user.telephone || "N/A"}</td>
//                 <td>{new Date(user.created_at).toLocaleDateString()}</td>
//                 <td>
//                   <div className="action-buttons">
//                     <button
//                       className="btn-reset"
//                       onClick={() => handleResetPassword(user)}
//                       title="Reset Password"
//                     >
//                       🔑
//                     </button>
//                     <button
//                       className="btn-delete"
//                       onClick={() => handleDeleteUser(user.id)}
//                       title="Delete User"
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filteredUsers.length === 0 && (
//           <div className="no-users">
//             <p>No users found matching your search.</p>
//           </div>
//         )}
//       </div>

//       {/* Admin Users Table */}
//       <div className="users-table-container admin-table">
//         <h3 className="section-title">Admin Users</h3>
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Last Login</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {admins.map((admin) => (
//               <tr key={admin.id}>
//                 <td>{admin.id}</td>
//                 <td>
//                   <div className="user-name">
//                     <strong>{admin.username}</strong>
//                   </div>
//                 </td>
//                 <td>{admin.email}</td>
//                 <td>
//                   <span className={`role-badge ${admin.role}`}>
//                     {admin.role}
//                   </span>
//                 </td>
//                 <td>
//                   {admin.last_login
//                     ? new Date(admin.last_login).toLocaleDateString()
//                     : "Never"}
//                 </td>
//                 <td>
//                   <span
//                     className={`status-badge ${
//                       admin.is_active ? "active" : "inactive"
//                     }`}
//                   >
//                     {admin.is_active ? "Active" : "Inactive"}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {admins.length === 0 && (
//           <div className="no-users">
//             <p>No admin users found.</p>
//           </div>
//         )}
//       </div>

//       {/* Reset Password Modal */}
//       {showResetModal && (
//         <div className="modal-overlay">
//           <div className="modal-content reset-modal">
//             <div className="modal-header">
//               <h3>Password Reset Successful</h3>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowResetModal(false)}
//               >
//                 ×
//               </button>
//             </div>

//             <div className="modal-body">
//               <p>Password has been reset for:</p>
//               <strong>
//                 {selectedUser.prenom} {selectedUser.nom}
//               </strong>
//               <br />
//               <em>{selectedUser.email}</em>

//               <div className="new-password-display">
//                 <label>New Password:</label>
//                 <div className="password-box">
//                   <code>{newPassword}</code>
//                   <button
//                     className="copy-btn"
//                     onClick={() => navigator.clipboard.writeText(newPassword)}
//                   >
//                     📋 Copy
//                   </button>
//                 </div>
//               </div>

//               <div className="warning">
//                 ⚠️ Please share this password securely with the user.
//               </div>
//             </div>

//             <div className="modal-footer">
//               <button
//                 className="btn-primary"
//                 onClick={() => setShowResetModal(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Admin Modal */}
//       {showAddAdminModal && (
//         <div className="modal-overlay">
//           <div className="modal-content admin-modal">
//             <div className="modal-header">
//               <h3>Add Admin User</h3>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowAddAdminModal(false)}
//               >
//                 ×
//               </button>
//             </div>

//             <form onSubmit={handleAddAdmin} className="admin-form">
//               <div className="form-group">
//                 <label htmlFor="username">Username</label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={adminFormData.username}
//                   onChange={handleAdminFormChange}
//                   required
//                   placeholder="Enter username"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={adminFormData.email}
//                   onChange={handleAdminFormChange}
//                   required
//                   placeholder="Enter email"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={adminFormData.password}
//                   onChange={handleAdminFormChange}
//                   required
//                   placeholder="Enter password"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="role">Role</label>
//                 <select
//                   id="role"
//                   name="role"
//                   value={adminFormData.role}
//                   onChange={handleAdminFormChange}
//                 >
//                   <option value="moderator">Moderator</option>
//                   <option value="admin">Admin</option>
//                   <option value="superadmin">Super Admin</option>
//                 </select>
//               </div>

//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className="btn-secondary"
//                   onClick={() => setShowAddAdminModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-primary">
//                   Create Admin User
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;

import { useState, useEffect } from "react";
import { Search, UserX, Shield, Trash2, Eye, EyeOff } from "react-feather";
import { toast } from "react-toastify";
import styles from "../styles/UserManagement.module.css";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.telephone.includes(searchTerm)
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/Backend/admin_routes.php?action=get_users', {
        credentials: 'include'
      });
      
      const result = await response.json();
      
      if (result.success) {
        setUsers(result.data.users);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
      
      // Get CSRF token
      const csrfResponse = await fetch('/Backend/admin_routes.php?action=get_csrf', {
        credentials: 'include'
      });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.data.csrf_token;

      const response = await fetch('/Backend/admin_routes.php?action=toggle_user_status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify({
          user_id: userId,
          status: newStatus
        })
      });

      const result = await response.json();
      
      if (result.success && result.data.success) {
        toast.success(result.data.message);
        fetchUsers(); // Refresh the list
      } else {
        toast.error(result.data.message || "Failed to update user status");
      }
    } catch (error) {
      console.error("Failed to toggle user status:", error);
      toast.error("Failed to update user status");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      // Get CSRF token
      const csrfResponse = await fetch('/Backend/admin_routes.php?action=get_csrf', {
        credentials: 'include'
      });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.data.csrf_token;

      const response = await fetch(`/Backend/admin_routes.php?action=delete_user&user_id=${userId}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': csrfToken
        },
        credentials: 'include'
      });

      const result = await response.json();
      
      if (result.success && result.data.success) {
        toast.success(result.data.message);
        fetchUsers(); // Refresh the list
      } else {
        toast.error(result.data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    
    if (!newAdmin.username || !newAdmin.email || !newAdmin.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      // Get CSRF token
      const csrfResponse = await fetch('/Backend/admin_routes.php?action=get_csrf', {
        credentials: 'include'
      });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.data.csrf_token;

      const response = await fetch('/Backend/admin_routes.php?action=create_admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify(newAdmin)
      });

      const result = await response.json();
      
      if (result.success && result.data.success) {
        toast.success(result.data.message);
        setNewAdmin({ username: "", email: "", password: "" });
        setShowCreateForm(false);
      } else {
        toast.error(result.data.message || "Failed to create admin");
      }
    } catch (error) {
      console.error("Failed to create admin:", error);
      toast.error("Failed to create admin");
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className={styles.userManagement}>
      <div className={styles.pageHeader}>
        <h1>User Management</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className={styles.createButton}
        >
          <Shield size={18} />
          Create Admin
        </button>
      </div>

      {showCreateForm && (
        <div className={styles.createAdminForm}>
          <h3>Create New Admin Account</h3>
          <form onSubmit={handleCreateAdmin}>
            <div className={styles.formRow}>
              <input
                type="text"
                placeholder="Username"
                value={newAdmin.username}
                onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                required
              />
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                Create Admin
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <Search size={20} />
          <input
            type="text"
            placeholder="Search users by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.usersTable}>
        <div className={styles.tableHeader}>
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Status</div>
          <div>Created</div>
          <div>Actions</div>
        </div>

        <div className={styles.tableBody}>
          {filteredUsers.map((user) => (
            <div key={user.id} className={styles.tableRow}>
              <div className={styles.userName}>
                {user.nom} {user.prenom}
              </div>
              <div className={styles.userEmail}>{user.email}</div>
              <div className={styles.userPhone}>{user.telephone}</div>
              <div className={styles.userStatus}>
                <span className={`${styles.statusBadge} ${user.status === 'active' ? styles.active : styles.blocked}`}>
                  {user.status || 'active'}
                </span>
              </div>
              <div className={styles.userDate}>
                {new Date(user.created_at).toLocaleDateString()}
              </div>
              <div className={styles.userActions}>
                <button
                  onClick={() => handleToggleUserStatus(user.id, user.status || 'active')}
                  className={`${styles.actionButton} ${user.status === 'active' ? styles.blockButton : styles.unblockButton}`}
                  title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                >
                  {user.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  title="Delete User"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredUsers.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <users size={48} />
          <h3>No users found</h3>
          <p>No users match your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
