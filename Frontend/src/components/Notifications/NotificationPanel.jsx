import { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { useAuction } from '../../contexts/AuctionContext';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications } = useAuction();

  return (
    <>
      <button
        className="notification-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={20} />
        {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
      </button>

      {isOpen && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <p>No new notifications</p>
              </div>
            ) : (
              notifications.map((notification, idx) => (
                <div key={notification?.id ?? idx} className="notification-item">
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {formatDistanceToNow(new Date(notification.time), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}