"use client";
import PageLayout from "@/components/UI/PageLayout";
import { getAllAssignments, assignmentByTSid } from "@/lib/service-data";
import { useSearchParams } from "next/navigation";

const assignmentColumns = [
  { header: "Assignment Name", accessor: "name" },
  { header: "Lesson", accessor: "lesson" },
  {
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

export default function AssignmentPage() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("Sassignment")
    ? "Sassignment"
    : searchParams.get("Tassignment")
    ? "Tassignment"
    : undefined;

  return (
    <PageLayout
      title="All Assignments"
      columns={assignmentColumns}
      fetchData={filter ? assignmentByTSid : getAllAssignments}
      tableType="assignment"
      filter={filter}
    />
  );
}
