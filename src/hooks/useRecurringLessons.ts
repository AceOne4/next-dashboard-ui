import { useMemo } from "react";
import moment, { Moment } from "moment";

// Define the shape of a lesson event
interface LessonEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

// Define the lesson details with startTime and endTime
interface LessonDetails {
  title: string;
  startTime: string; // Start time in 'HH:mm' format (e.g., "08:00")
  endTime: string; // End time in 'HH:mm' format (e.g., "09:00")
  daysOfWeek: number[]; // Days of the week (e.g., [1, 3] for Monday, Wednesday)
}

// Custom hook for generating recurring lessons
const useRecurringLessons = (
  startDate: string,
  endDate: string,
  lessons: LessonDetails[]
) => {
  const events = useMemo(() => {
    const generatedEvents: LessonEvent[] = [];

    lessons.forEach((lesson) => {
      const currentDate: Moment = moment(startDate);
      const end: Moment = moment(endDate);

      // Loop through each day from startDate to endDate
      while (currentDate.isSameOrBefore(end)) {
        // Check if the current day is in the daysOfWeek array
        if (lesson.daysOfWeek.includes(currentDate.day())) {
          // Create a start time for the lesson on the current day
          const lessonStart = moment(
            currentDate.format("YYYY-MM-DD") + " " + lesson.startTime
          );
          const lessonEnd = moment(
            currentDate.format("YYYY-MM-DD") + " " + lesson.endTime
          );

          // Add a lesson event for that day
          generatedEvents.push({
            title: lesson.title,
            start: lessonStart.toDate(), // Start time of the lesson
            end: lessonEnd.toDate(), // End time of the lesson
            allDay: false,
          });
        }
        currentDate.add(1, "day"); // Move to the next day
      }
    });

    return generatedEvents;
  }, [startDate, endDate, lessons]);

  return events;
};

export default useRecurringLessons;
