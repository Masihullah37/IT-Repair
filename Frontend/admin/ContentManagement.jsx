import React, { useState, useEffect } from "react";
import { fetchApi } from "../src/config/api";
import "../../styles/ContentManagement.css";

const ContentManagement = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetchApi("admin_get_settings");
      if (response.success) {
        setSettings(response.settings || []);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (setting) => {
    setEditingField(setting.setting_key);
    setTempValue(setting.setting_value || "");
  };

  const handleSave = async (settingKey) => {
    try {
      await fetchApi("admin_update_setting", {
        method: "POST",
        body: JSON.stringify({
          setting_key: settingKey,
          setting_value: tempValue,
        }),
      });

      // Update local state
      setSettings(
        settings.map((setting) =>
          setting.setting_key === settingKey
            ? { ...setting, setting_value: tempValue }
            : setting
        )
      );

      setEditingField(null);
      setTempValue("");
      alert("Setting updated successfully!");
    } catch (error) {
      console.error("Error updating setting:", error);
      alert("Error updating setting: " + error.message);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const getSettingsByCategory = () => {
    const categories = {
      "Company Information": [
        "company_name",
        "contact_phone",
        "contact_email",
        "contact_address",
        "company_logo",
      ],
      "Hero Section": ["hero_title", "hero_subtitle", "hero_description"],
      "Services Section": ["services_title", "services_description"],
    };

    return Object.entries(categories).map(([categoryName, keys]) => ({
      name: categoryName,
      settings: settings.filter((setting) =>
        keys.includes(setting.setting_key)
      ),
    }));
  };

  if (loading) {
    return <div className="loading">Loading content settings...</div>;
  }

  return (
    <div className="content-management">
      <div className="content-header">
        <h2>Content Management</h2>
        <p>Edit website content and company information</p>
      </div>

      {getSettingsByCategory().map((category) => (
        <div key={category.name} className="content-category">
          <h3>{category.name}</h3>
          <div className="settings-grid">
            {category.settings.map((setting) => (
              <div key={setting.setting_key} className="setting-card">
                <div className="setting-header">
                  <label>{setting.description || setting.setting_key}</label>
                  {editingField !== setting.setting_key && (
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(setting)}
                    >
                      ✏️ Edit
                    </button>
                  )}
                </div>

                {editingField === setting.setting_key ? (
                  <div className="editing-field">
                    {setting.setting_type === "textarea" ? (
                      <textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        rows="4"
                        className="edit-textarea"
                      />
                    ) : setting.setting_type === "file" ? (
                      <div className="file-input-group">
                        <input
                          type="text"
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          placeholder="Enter file path or URL"
                          className="edit-input"
                        />
                        <small>Upload files to /public/images/ folder</small>
                      </div>
                    ) : (
                      <input
                        type={
                          setting.setting_type === "email" ? "email" : "text"
                        }
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="edit-input"
                      />
                    )}

                    <div className="edit-actions">
                      <button
                        className="save-btn"
                        onClick={() => handleSave(setting.setting_key)}
                      >
                        ✅ Save
                      </button>
                      <button className="cancel-btn" onClick={handleCancel}>
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="setting-display">
                    {setting.setting_type === "file" &&
                    setting.setting_value ? (
                      <div className="file-preview">
                        <img
                          src={setting.setting_value}
                          alt="Preview"
                          className="image-preview"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                        <div className="file-path" style={{ display: "none" }}>
                          {setting.setting_value}
                        </div>
                      </div>
                    ) : (
                      <div className="text-display">
                        {setting.setting_value || "Not set"}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="content-actions">
        <div className="action-card">
          <h3>🎨 Logo Management</h3>
          <p>Upload and manage your company logo</p>
          <div className="file-upload-area">
            <input
              type="file"
              id="logo-upload"
              accept="image/*"
              style={{ display: "none" }}
            />
            <label htmlFor="logo-upload" className="upload-btn">
              📁 Choose Logo File
            </label>
            <small>Recommended: PNG/JPG, max 2MB</small>
          </div>
        </div>

        <div className="action-card">
          <h3>🔄 Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-btn">📝 Edit Homepage</button>
            <button className="action-btn">🎯 Update Services</button>
            <button className="action-btn">📞 Contact Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
