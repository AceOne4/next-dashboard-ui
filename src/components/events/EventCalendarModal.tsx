import { convertToDayMonthYear, convertToHourMin } from "@/lib/helpers";
import React from "react";

// Define the modal props
type EventModalProps = {
  events: TEvent[];
  onClose: () => void;
};

const EventModal: React.FC<EventModalProps> = ({ events, onClose }) => {
  if (!events.length) return null; // Don't render anything if there are no events

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 relative">
        <h2 className="text-2xl font-semibold mb-4">Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.map((event, i) => (
            <div
              key={event._id}
              className={`${
                i % 2 == 0 ? "bg-lamaskyLight" : " bg-lamaYellowLight"
              } p-4 rounded shadow`}
            >
              <h3 className="font-semibold">{event.title}</h3>
              <p className="mb-2">{event.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Date:</strong>{" "}
                {convertToDayMonthYear(String(event.startTime))}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Start:</strong>{" "}
                {convertToHourMin(String(event.startTime))}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>End:</strong> {convertToHourMin(String(event.endTime))}
              </p>
            </div>
          ))}
        </div>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;
