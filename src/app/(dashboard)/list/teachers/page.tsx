"use client";
import PageLayout from "@/components/UI/PageLayout";
import { getAllTeachers, teacherBySid } from "@/lib/service-data";
import { useSearchParams } from "next/navigation";

const teacherColumns = [
  { header: "Info", accessor: "info" },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function TeacherPage() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("Steacher") ? "Steacher" : undefined;
  return (
    <PageLayout
      title="All Teachers"
      columns={teacherColumns}
      fetchData={filter ? teacherBySid : getAllTeachers}
      tableType="teacher"
      itemsPerPage={5}
      filter={filter}
    />
  );
}
