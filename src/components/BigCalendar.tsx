"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import useRecurringLessons from "@/hooks/useRecurringLessons";
import { convertToHourMin, isTeacher } from "@/lib/helpers";
const localizer = momentLocalizer(moment);

const BigCalendar = ({ person }: { person: TStudent | TTeacher }) => {
  const daysoftheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const startDate = "2024-10-01"; // Start of the semester
  const endDate = "2024-12-31"; // End of the semester
  const lessons: TLesson[] = isTeacher(person)
    ? (person.lessons as TLesson[])
    : ((person.class as TClass).lessons as TLesson[]);

  const lessonDetails = lessons.map((less) => {
    const details = {
      title: (less.subject as TSubject).name,
      startTime: "8:00", //convertToHourMin(less.startTime),
      endTime: "09:00", //convertToHourMin(less.endTime),
      daysOfWeek: [daysoftheWeek.indexOf(less.day) + 1], // Days of the week (e.g., [1, 3] for Monday, Wednesday)
    };
    return details;
  });

  const events = useRecurringLessons(startDate, endDate, lessonDetails);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      defaultDate={new Date()} // Ensures the calendar opens on the current date
      min={new Date(moment().year(), moment().month(), moment().date(), 8, 0)} // Start time for working hours
      max={new Date(moment().year(), moment().month(), moment().date(), 17, 0)} // End time for working hours
    />
  );
};

export default BigCalendar;
