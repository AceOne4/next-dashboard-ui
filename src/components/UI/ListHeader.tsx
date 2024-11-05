"use client";
import React, { useState, useEffect } from "react";
import TableSearch from "../TableSearch";
import Image from "next/image";
import FormModal from "../FormModal";
import SortModal from "../modals/SortModal";
import { useSession } from "next-auth/react";

export default function ListHeader({
  title,
  table,
  items,
  setFilteredItems,
  column,
}: {
  title: string;
  table: TableTypes;
  items: any[];
  setFilteredItems: React.Dispatch<React.SetStateAction<any[]>>;
  column: Column[];
}) {
  const { data } = useSession();
  const [search, setSearch] = useState("");
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [sortField, setSortField] = useState<string>("");
  const headers = column
    .map((col) => col.header)
    .filter((col) => !col.includes("Action") && !col.includes("ID"));

  useEffect(() => {
    // Apply search filter if a search term is present
    const applySearchFilter = (data: any[]) => {
      if (!search) return data; // Show all items if search is empty
      return data.filter(
        (item) =>
          item.name || item.title?.toLowerCase().includes(search.toLowerCase())
      );
    };

    // Apply sorting if a sort field is selected
    const applySortFilter = (data: any[]) => {
      if (!sortField) return data; // Show unsorted items if no sort field is selected
      return [...data].sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));
    };

    // Combine search and sort filters
    const filteredData = applySortFilter(applySearchFilter(items));
    setFilteredItems(filteredData);
  }, [search, sortField, items, setFilteredItems]);

  const handleSortSelect = (field: string) => {
    if (field === "Info") setSortField("name");
    else setSortField(field.toLocaleLowerCase());
    setIsSortModalOpen(false);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="hidden md:block text-lg font-semibold">{title}</h1>
      <div className="flex flex-col gap-4 md:flex-row  items-center w-full md:w-auto">
        <TableSearch setSearch={setSearch} />
        <div className="flex items-center gap-4 self-end">
          <button
            className="flex items-center justify-center rounded-full bg-lamaYellow w-8 h-8"
            onClick={() => setIsSortModalOpen((prev) => !prev)}
          >
            <Image src="/sort.png" alt="filter" width={14} height={14} />
          </button>
          {isSortModalOpen && (
            <SortModal
              headers={headers}
              onSortSelect={handleSortSelect}
              onClose={() => setIsSortModalOpen(false)}
            />
          )}
          {data?.user.role === "student" && (
            <FormModal table={table} type="create" />
          )}
        </div>
      </div>
    </div>
  );
}
