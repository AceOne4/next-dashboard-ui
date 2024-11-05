"use client";
import PageLayout from "@/components/UI/PageLayout";
import { getAllClasses } from "@/lib/service-data";

const classColumns = [
  { header: "Class Name", accessor: "name" },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  { header: "Grade", accessor: "grade", className: "hidden md:table-cell" },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

export default function ClassPage() {
  return (
    <PageLayout
      title="All Classes"
      columns={classColumns}
      fetchData={getAllClasses}
      tableType="class"
    />
  );
}
