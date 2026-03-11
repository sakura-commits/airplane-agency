import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInfoCircle, 
  faCheckCircle, 
  faExclamationTriangle, 
  faTimesCircle 
} from '@fortawesome/free-solid-svg-icons';

export function Notification({ show, type = 'info', message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (show && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const getIcon = () => {
    switch(type) {
      case 'success':
        return faCheckCircle;
      case 'warning':
        return faExclamationTriangle;
      case 'error':
        return faTimesCircle;
      default:
        return faInfoCircle;
    }
  };

  const getBackgroundColor = () => {
    switch(type) {
      case 'success':
        return '#d4edda';
      case 'warning':
        return '#fff3cd';
      case 'error':
        return '#f8d7da';
      default:
        return '#d1ecf1';
    }
  };

  const getTextColor = () => {
    switch(type) {
      case 'success':
        return '#155724';
      case 'warning':
        return '#856404';
      case 'error':
        return '#721c24';
      default:
        return '#0c5460';
    }
  };

  return (
    <div 
      className="reusable-notification"
      style={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        borderLeft: `4px solid ${getTextColor()}`
      }}
    >
      <div className="notification-wrapper">
        <div className="notification-icon">
          <FontAwesomeIcon icon={getIcon()} />
        </div>
        <div className="notification-text">{message}</div>
        <button 
          className="notification-dismiss"
          onClick={onClose}
          style={{ color: getTextColor() }}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}
