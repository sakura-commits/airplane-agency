import React, { useEffect } from 'react';
import '../App.css';

export function Toast({ message, type = 'success', duration = 3000, onClose }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`toast ${type}`}> 
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>&times;</button>
    </div>
  );
}
