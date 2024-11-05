"use client";
import PageLayout from "@/components/UI/PageLayout";
import { getAllSubjects } from "@/lib/service-data";

const subjectColumns = [
  { header: "Subject Name", accessor: "name" },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

export default function SubjectPage() {
  return (
    <PageLayout
      title="All Subjects"
      columns={subjectColumns}
      fetchData={getAllSubjects}
      tableType="subject"
    />
  );
}
