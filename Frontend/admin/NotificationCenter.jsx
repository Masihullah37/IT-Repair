import React, { useState, useEffect } from "react";
import { fetchApi } from "../src/config/api";
import "../../styles/NotificationCenter.css";

const NotificationCenter = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [notificationType, setNotificationType] = useState("general");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetchApi("admin_get_users");
      if (response.success) {
        setUsers(response.users || []);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setUsersLoading(false);
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    setSelectedUsers(users.map((user) => user.id));
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  const sendNotifications = async () => {
    if (!notificationTitle.trim() || !notificationMessage.trim()) {
      alert("Please enter both title and message");
      return;
    }

    if (selectedUsers.length === 0) {
      alert("Please select at least one user");
      return;
    }

    setLoading(true);

    try {
      const promises = selectedUsers.map((userId) =>
        fetchApi("admin_send_notification", {
          method: "POST",
          body: JSON.stringify({
            user_id: userId,
            type: notificationType,
            title: notificationTitle,
            message: notificationMessage,
          }),
        })
      );

      await Promise.all(promises);

      alert(
        `Notifications sent successfully to ${selectedUsers.length} users!`
      );

      // Reset form
      setNotificationTitle("");
      setNotificationMessage("");
      setSelectedUsers([]);
      setNotificationType("general");
    } catch (error) {
      console.error("Error sending notifications:", error);
      alert("Error sending notifications: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationTemplates = () => {
    return {
      order: {
        title: "Order Status Update",
        message:
          "Your order has been updated. Please check your account for details.",
      },
      repair: {
        title: "Repair Status Update",
        message:
          "Your repair request status has been updated. We will contact you soon with more details.",
      },
      general: {
        title: "Important Announcement",
        message: "We have an important update to share with you.",
      },
    };
  };

  const loadTemplate = (type) => {
    const templates = getNotificationTemplates();
    if (templates[type]) {
      setNotificationTitle(templates[type].title);
      setNotificationMessage(templates[type].message);
    }
  };

  if (usersLoading) {
    return <div className="loading">Loading notification center...</div>;
  }

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h2>Notification Center</h2>
        <p>
          Send notifications to users about orders, repairs, and announcements
        </p>
      </div>

      <div className="notification-content">
        <div className="notification-form">
          <div className="form-section">
            <h3>Compose Notification</h3>

            <div className="form-group">
              <label htmlFor="type">Notification Type</label>
              <select
                id="type"
                value={notificationType}
                onChange={(e) => {
                  setNotificationType(e.target.value);
                  loadTemplate(e.target.value);
                }}
                className="notification-type-select"
              >
                <option value="general">General Announcement</option>
                <option value="order">Order Update</option>
                <option value="repair">Repair Update</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
                placeholder="Enter notification title"
                className="notification-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                placeholder="Enter notification message"
                rows="4"
                className="notification-textarea"
              />
            </div>

            <div className="template-buttons">
              <h4>Quick Templates:</h4>
              <div className="template-grid">
                <button
                  className="template-btn"
                  onClick={() => loadTemplate("order")}
                >
                  📦 Order Template
                </button>
                <button
                  className="template-btn"
                  onClick={() => loadTemplate("repair")}
                >
                  🔧 Repair Template
                </button>
                <button
                  className="template-btn"
                  onClick={() => loadTemplate("general")}
                >
                  📢 General Template
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="user-selection">
          <div className="selection-header">
            <h3>Select Recipients ({selectedUsers.length} selected)</h3>
            <div className="selection-controls">
              <button className="select-all-btn" onClick={selectAllUsers}>
                Select All
              </button>
              <button className="clear-btn" onClick={clearSelection}>
                Clear
              </button>
            </div>
          </div>

          <div className="users-list">
            {users.map((user) => (
              <div
                key={user.id}
                className={`user-item ${
                  selectedUsers.includes(user.id) ? "selected" : ""
                }`}
                onClick={() => handleUserSelection(user.id)}
              >
                <div className="user-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelection(user.id)}
                  />
                </div>
                <div className="user-info">
                  <strong>
                    {user.prenom} {user.nom}
                  </strong>
                  <small>{user.email}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="notification-actions">
        <div className="preview-section">
          <h4>Preview:</h4>
          <div className="notification-preview">
            <div className="preview-header">
              <strong>{notificationTitle || "Notification Title"}</strong>
              <span className={`type-badge ${notificationType}`}>
                {notificationType.charAt(0).toUpperCase() +
                  notificationType.slice(1)}
              </span>
            </div>
            <div className="preview-body">
              {notificationMessage ||
                "Notification message will appear here..."}
            </div>
          </div>
        </div>

        <button
          className="send-notification-btn"
          onClick={sendNotifications}
          disabled={
            loading ||
            selectedUsers.length === 0 ||
            !notificationTitle.trim() ||
            !notificationMessage.trim()
          }
        >
          {loading ? "Sending..." : `Send to ${selectedUsers.length} users`}
        </button>
      </div>
    </div>
  );
};

export default NotificationCenter;
