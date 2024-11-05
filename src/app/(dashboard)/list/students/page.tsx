"use client";
import PageLayout from "@/components/UI/PageLayout";
import { getAllStudents, studentByTid } from "@/lib/service-data";
import { useSearchParams } from "next/navigation";

const studentColumns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  { header: "Grade", accessor: "grade", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function StudentPage() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("Tstudent") ? "Tstudent" : undefined;
  return (
    <PageLayout
      title="All Students"
      columns={studentColumns}
      fetchData={filter ? studentByTid : getAllStudents}
      tableType="student"
      itemsPerPage={10}
      filter={filter}
    />
  );
}
