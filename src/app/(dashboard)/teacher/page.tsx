import { auth } from "@/auth/auth";
import Annocements from "@/components/Annocements";
import BigCalendar from "@/components/BigCalendar";
import { getAnnouncememnts, getTeacherById } from "@/lib/service-data";
import React from "react";

export default async function page() {
  const announcements = await getAnnouncememnts();
  const sesion = await auth();
  const teacher = await getTeacherById(sesion?.user.id);

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row h-full ">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule </h1>
          <BigCalendar person={teacher} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Annocements announcemtnts={announcements.items} />
      </div>
    </div>
  );
}
