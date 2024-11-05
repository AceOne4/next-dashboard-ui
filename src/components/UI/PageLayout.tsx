"use client";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import ListHeader from "@/components/UI/ListHeader";
import RowRendering from "@/components/UI/RowRendering";
import { usePagination } from "@/hooks/usePagination";
import React, { useEffect, useState } from "react";

interface PageLayoutProps {
  title: string;
  columns: Column[];
  fetchData: (
    page: number,
    key?: string,
    value?: string
  ) => Promise<{ items: any[]; count: number }>;
  tableType: string;
  itemsPerPage?: number;
  filter?: string | undefined;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  columns,
  fetchData,
  tableType,
  itemsPerPage = 10,
  filter,
}) => {
  const { items, currentPage, totalPages, handlePageChange } = usePagination(
    itemsPerPage,
    fetchData,
    filter
  );
  const [filteredItems, setFilteredItems] = useState(items);
  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const renderRow = (item: any) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <RowRendering item={item} table={tableType as TableTypes} />
    </tr>
  );

  return (
    <div className="flex-1 bg-white p-4 rounded-md m-4">
      {/* Top */}
      <ListHeader
        title={title}
        table={tableType as TableTypes}
        items={items}
        setFilteredItems={setFilteredItems}
        column={columns}
      />
      {/* Middle */}
      <Table column={columns} row={renderRow} data={filteredItems} />
      {/* Bottom */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PageLayout;
