"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CardHeader from "../UI/CardHeader";
import { convertToHourMin, sortByDate } from "@/lib/helpers";
import { useEventCalendar } from "@/hooks/useEventCalnedat";
import EventModal from "./EventCalendarModal";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
function EventCalendar({ events }: { events: TEvent[] }) {
  const [value, onChange] = useState<Value>(new Date());
  const eventes = sortByDate(events).slice(-3);

  const { isEventDay, handleClickEvent, selectedEvents, closeEventModal } =
    useEventCalendar(events);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month" && isEventDay(date)) {
      return (
        <span
          onClick={() => handleClickEvent(date)}
          className="event-marker"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClickEvent(date);
            }
          }}
        >
          📅
        </span>
      );
    }
    return null;
  };

  return (
    <div className=" relative bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} tileContent={tileContent} />
      <CardHeader name="Events" className="my-4" />

      <div className="flex flex-col gap-4">
        {eventes.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamasky even:border-t-lamaPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">
                {convertToHourMin(event.startTime)} -
                {convertToHourMin(event.endTime)}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
      <EventModal events={selectedEvents} onClose={closeEventModal} />
    </div>
  );
}

export default EventCalendar;
