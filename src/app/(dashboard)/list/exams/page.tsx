"use client";
import PageLayout from "@/components/UI/PageLayout";
import { examByTSid, getAllExams } from "@/lib/service-data";
import { useSearchParams } from "next/navigation";

const examColumns = [
  { header: "Exam Name", accessor: "name" },
  { header: "Lesson", accessor: "lesson" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function ExamPage() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("Sexam")
    ? "Sexam"
    : searchParams.get("Texam")
    ? "Texam"
    : undefined;

  return (
    <PageLayout
      title="All Exams"
      columns={examColumns}
      fetchData={filter ? examByTSid : getAllExams}
      tableType="exam"
      filter={filter}
    />
  );
}
