import { auth } from "@/auth/auth";
import Annocements from "@/components/Annocements";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/events/EventCalendar";
import {
  getAnnouncememnts,
  getEvents,
  getStudentById,
} from "@/lib/service-data";
import React from "react";

async function page() {
  const sesion = await auth();
  const announcements = await getAnnouncememnts();
  const events = await getEvents();
  const student: TStudent = await getStudentById(sesion?.user.id);

  return (
    <div className="flex flex-col gap-4 p-4 xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3">
        <div className=" h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">
            Schedule ({(student.class as TClass).name})
          </h1>
          <BigCalendar person={student} />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar events={events.items} />
        <Annocements announcemtnts={announcements.items} />
      </div>
    </div>
  );
}

export default page;
