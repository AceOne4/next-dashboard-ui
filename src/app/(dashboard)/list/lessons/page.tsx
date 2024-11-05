"use client";
import PageLayout from "@/components/UI/PageLayout";
import { getAllLessons, lessonByTSid } from "@/lib/service-data";
import { useSearchParams } from "next/navigation";

const lessonColumns = [
  { header: "Subject Name", accessor: "name" },
  { header: "Class", accessor: "class" },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function LessonPage() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("Slesson")
    ? "Slesson"
    : searchParams.get("Tlesson")
    ? "Tlesson"
    : undefined;

  return (
    <PageLayout
      title="All Lessons"
      columns={lessonColumns}
      fetchData={filter ? lessonByTSid : getAllLessons}
      tableType="lesson"
      filter={filter}
    />
  );
}
