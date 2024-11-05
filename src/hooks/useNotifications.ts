import { pusherClient } from "@/lib/pusher";
import { getStudentById, getTeacherById } from "@/lib/service-data";
import { useEffect } from "react";

const usePusherNotifications = (
  userId: string,
  role: string,
  setNotifications: React.Dispatch<React.SetStateAction<TNotification[]>>
) => {
  useEffect(() => {
    if (!userId) return;
    const fetchClassesId = async (role: string) => {
      switch (role) {
        case "admin":
          return;
        case "student":
          const student = await getStudentById(userId);
          return [student.class];
        case "teacher":
          const teacher = await getTeacherById(userId);
          return teacher.classes;
        case "parent":
          return [];
        default:
          console.log("Something went wrong");
          return [];
      }
    };

    const setupPusherChanner = async () => {
      const classIds = await fetchClassesId(role);

      // Subscribe to class-specific channels
      classIds.forEach((classId: string) => {
        const announcementChannel = pusherClient.subscribe(
          `class-${classId}-announcement`
        );
        const eventChannel = pusherClient.subscribe(`class-${classId}-event`);
        const messageChannel = pusherClient.subscribe(
          `class-${classId}-message`
        );

        // Listen for new announcements
        announcementChannel.bind("new-announcement", (data: TNotification) => {
          setNotifications((prev) => [data, ...prev]);
        });

        // Listen for new events
        eventChannel.bind("new-event", (data: TNotification) => {
          setNotifications((prev) => [data, ...prev]);
        });

        // Listen for new class messages
        messageChannel.bind("new-message", (data: TNotification) => {
          setNotifications((prev) => [data, ...prev]);
        });
      });
      // Unique private message channel based on the receiver ID
      const privateMessageChannel = pusherClient.subscribe(
        `private-message-${userId}`
      );

      const generalAnnouncementChannel =
        pusherClient.subscribe(`general-announcement`);
      const generalEventChannel = pusherClient.subscribe(`general-event`);

      // Listen for private messages on the unique channel
      privateMessageChannel.bind(
        "new-private-message",
        (data: TNotification) => {
          setNotifications((prev) => [data, ...prev]);
        }
      );

      // Listen for general announcements
      generalAnnouncementChannel.bind(
        "new-general-announcement",
        (data: TNotification) => {
          setNotifications((prev) => [data, ...prev]);
        }
      );

      // Listen for general events
      generalEventChannel.bind("new-general-event", (data: TNotification) => {
        setNotifications((prev) => [data, ...prev]);
      });

      // Cleanup on component unmount
      return () => {
        privateMessageChannel.unbind_all();
        generalAnnouncementChannel.unbind_all();
        generalEventChannel.unbind_all();

        classIds.forEach((classId: string) => {
          pusherClient.unsubscribe(`class-${classId}-announcement`);
          pusherClient.unsubscribe(`class-${classId}-event`);
          pusherClient.unsubscribe(`class-${classId}-message`);
        });
        privateMessageChannel.unsubscribe();
        generalAnnouncementChannel.unsubscribe();
        generalEventChannel.unsubscribe();
      };
    };
    setupPusherChanner();
  }, [role, userId, setNotifications]); // Include setNotifications in the dependencies array
};

export default usePusherNotifications;
