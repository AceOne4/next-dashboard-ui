"use client";
import PageLayout from "@/components/UI/PageLayout";
import { getAllParents } from "@/lib/service-data";

const parentColumns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student Names",
    accessor: "students",
    className: "hidden md:table-cell",
  },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function ParentPage() {
  return (
    <PageLayout
      title="All Parents"
      columns={parentColumns}
      fetchData={getAllParents}
      tableType="parent"
      itemsPerPage={5}
    />
  );
}
