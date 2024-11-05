"use client";
import PageLayout from "@/components/UI/PageLayout";
import { getAllEvents } from "@/lib/service-data"; // Ensure you implement this function to fetch event data

const eventColumns = [
  { header: "Title", accessor: "title" },
  { header: "Description", accessor: "description" },
  { header: "Start Time", accessor: "startTime" },
  { header: "End Time", accessor: "endTime" },
  { header: "Actions", accessor: "action" },
];

export default function EventPage() {
  return (
    <PageLayout
      title="All Events"
      columns={eventColumns}
      fetchData={getAllEvents}
      tableType="event"
    />
  );
}
