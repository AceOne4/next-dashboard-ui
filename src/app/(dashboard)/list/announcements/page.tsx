"use client";
import PageLayout from "@/components/UI/PageLayout";
import { getAllAnnouncements } from "@/lib/service-data";

const announcementColumns = [
  { header: "Title", accessor: "title" },
  { header: "Description", accessor: "description" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function AnnouncementPage() {
  return (
    <PageLayout
      title="All Announcements"
      columns={announcementColumns}
      fetchData={getAllAnnouncements}
      tableType="announcement"
    />
  );
}
