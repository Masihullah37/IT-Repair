import React from 'react';
import '../../styles/AdminStats.css';

const AdminStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: 'blue',
      trend: '+12%'
    },
    {
      title: 'Products',
      value: stats.totalProducts,
      icon: '📦',
      color: 'green',
      trend: '+5%'
    },
    {
      title: 'Pending Repairs',
      value: stats.pendingRepairs,
      icon: '🔧',
      color: 'orange',
      trend: '-8%'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: '💰',
      color: 'purple',
      trend: '+23%'
    }
  ];

  return (
    <div className="admin-stats">
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <span className="stat-trend">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-grid">
          <button className="action-btn primary">
            <span>➕</span>
            Add Product
          </button>
          <button className="action-btn secondary">
            <span>📧</span>
            Send Notification
          </button>
          <button className="action-btn success">
            <span>✅</span>
            Update Repair
          </button>
          <button className="action-btn warning">
            <span>⚙️</span>
            Site Settings
          </button>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">👤</div>
            <div className="activity-content">
              <p>New user registered</p>
              <small>5 minutes ago</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🔧</div>
            <div className="activity-content">
              <p>Repair request submitted</p>
              <small>15 minutes ago</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">💰</div>
            <div className="activity-content">
              <p>Payment completed</p>
              <small>1 hour ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;