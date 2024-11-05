"use client";
import PageLayout from "@/components/UI/PageLayout";
import { getAllAttendances } from "@/lib/service-data"; // Ensure you implement this function to fetch attendance data

const attendanceColumns = [
  { header: "Date", accessor: "date" },
  { header: "Student", accessor: "studentName" }, // Adjust based on how you structure student data
  { header: "Present", accessor: "present" },
  { header: "Actions", accessor: "action" },
];

export default function AttendancePage() {
  return (
    <PageLayout
      title="All Attendance Records"
      columns={attendanceColumns}
      fetchData={getAllAttendances}
      tableType="attendance"
    />
  );
}
