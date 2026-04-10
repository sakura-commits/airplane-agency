import React from 'react';

export function PaymentManagement() {
  return (
    <div className="management-container">
      <h1>Payment Management</h1>
      <p>Track transactions and reconcile payout reports.</p>
      <div className="management-cards">
        <div className="management-card"><h3>Transactions</h3><p>1,203</p></div>
        <div className="management-card"><h3>Failed</h3><p>14</p></div>
        <div className="management-card"><h3>Today</h3><p>$3,720</p></div>
      </div>
    </div>
  );
}