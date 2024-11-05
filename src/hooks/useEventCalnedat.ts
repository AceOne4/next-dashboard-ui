import { useState } from "react";

// Define the return type of the hook
type UseEventCalendarReturnType = {
  isEventDay: (date: Date) => boolean;
  handleClickEvent: (date: Date) => void;
  selectedEvents: TEvent[];
  closeEventModal: () => void;
};

// Custom hook for event calendar logic
export const useEventCalendar = (
  events: TEvent[]
): UseEventCalendarReturnType => {
  const [selectedEvents, setSelectedEvents] = useState<TEvent[]>([]); // Handle multiple events

  // Check if a specific date has an event
  const isEventDay = (date: Date): boolean => {
    return events.some(
      (event) =>
        new Date(event.startTime).toDateString() === date.toDateString()
    );
  };

  // Handle event click and add to the selectedEvents array
  const handleClickEvent = (date: Date): void => {
    const filteredEvents = events.filter(
      (event) =>
        new Date(event.startTime).toDateString() === date.toDateString()
    );

    if (filteredEvents.length > 0) {
      setSelectedEvents((prev) => [...prev, ...filteredEvents]); // Spread the filtered events into the previous state
    }
  };

  // Close modal and clear selected events
  const closeEventModal = (): void => {
    setSelectedEvents([]); // Clear all selected events
  };

  return { isEventDay, handleClickEvent, selectedEvents, closeEventModal };
};
