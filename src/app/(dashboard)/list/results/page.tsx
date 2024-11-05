"use client";
import PageLayout from "@/components/UI/PageLayout";
import { getAllResults, resultBySid } from "@/lib/service-data";
import { useSearchParams } from "next/navigation";

const resultColumns = [
  { header: "Subject Name", accessor: "name" },
  { header: "Student", accessor: "student" },
  { header: "Score", accessor: "score", className: "hidden md:table-cell" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function ResultPage() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("Sresult") ? "Sresult" : undefined;

  return (
    <PageLayout
      title="All Results"
      columns={resultColumns}
      fetchData={filter ? resultBySid : getAllResults}
      tableType="result"
      itemsPerPage={10}
      filter={filter}
    />
  );
}
