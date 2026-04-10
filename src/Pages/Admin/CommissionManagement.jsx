import React from 'react';

export function CommissionManagement() {
  return (
    <div className="management-container">
      <h1>Commission Management</h1>
      <p>Configure rates and monitor payouts.</p>
      <div className="management-cards">
        <div className="management-card"><h3>Current Rate</h3><p>15%</p></div>
        <div className="management-card"><h3>This Month</h3><p>$12,600</p></div>
        <div className="management-card"><h3>Pending</h3><p>$2,340</p></div>
      </div>
    </div>
  );
}