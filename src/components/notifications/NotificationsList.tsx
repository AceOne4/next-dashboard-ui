import usePusherNotifications from "@/hooks/useNotifications";
import { Session } from "next-auth";
import React, { Dispatch, SetStateAction } from "react";

interface NotificationsListProps {
  notifications: TNotification[];
  onClose: () => void;
  setNotifications: Dispatch<SetStateAction<TNotification[]>>;
  session: Session | null;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onClose,
  setNotifications,
  session,
}) => {
  usePusherNotifications(
    session?.user.id,
    session?.user.role,
    setNotifications
  );
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-h-[400px] overflow-y-auto relative">
      <h2 className="text-lg font-semibold">Notifications</h2>
      <button
        onClick={onClose}
        className="text-red-500 mb-2 absolute top-3 right-3 border border-red-300 rounded h-6 w-6 hover:bg-red-200 hover:text-red-800 hover:border-none transition"
      >
        X
      </button>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} className="border-b py-2">
              <p>{notification.content}</p>
              <span className="text-xs text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsList;
