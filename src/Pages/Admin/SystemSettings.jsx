import React from 'react';

export function SystemSettings() {
  return (
    <div className="management-container">
      <h1>System Settings</h1>
      <p>Configure app settings, roles and permissions.</p>
      <div className="management-cards">
        <div className="management-card"><h3>Roles</h3><p>5</p></div>
        <div className="management-card"><h3>Logs</h3><p>Updated 1h ago</p></div>
        <div className="management-card"><h3>API Status</h3><p>Online</p></div>
      </div>
    </div>
  );
}