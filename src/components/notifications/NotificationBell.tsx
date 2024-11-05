import React, { ReactNode, useState } from "react";
import NotificationsList from "./NotificationsList";
import { useSession } from "next-auth/react";

interface MyComponentProps {
  children: ReactNode; // Use ReactNode to allow any valid React child
}

const NotificationBell: React.FC<MyComponentProps> = ({ children }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<TNotification[]>([]);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>{children}</button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72">
          <NotificationsList
            notifications={notifications}
            onClose={() => setIsOpen(false)}
            setNotifications={setNotifications}
            session={session}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
