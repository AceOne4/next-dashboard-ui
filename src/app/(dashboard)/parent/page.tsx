import { auth } from "@/auth/auth";
import Annocements from "@/components/Annocements";
import BigCalendar from "@/components/BigCalendar";
import ScheduleSwitcher from "@/components/student/StudentSwitcher";
import { getAnnouncememnts, getParentById } from "@/lib/service-data";
import React from "react";

export default async function page() {
  const session = await auth();
  const announcements = await getAnnouncememnts();
  const parent = await getParentById(session?.user.id);
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <ScheduleSwitcher students={parent.students} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Annocements announcemtnts={announcements.items} />
      </div>
    </div>
  );
}
