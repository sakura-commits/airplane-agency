import React, { useEffect } from "react";
import "../App.css";

function Toast({ message, type = "success", onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast-container ${type}`}>
      <div className="toast-message">
        {message}
      </div>
      <button className="toast-close-btn" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default Toast;