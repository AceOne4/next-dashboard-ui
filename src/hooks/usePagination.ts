import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

type FetchFunction = (
  page: number,
  key?: string,
  value?: string
) => Promise<{ items: any[]; count: number }>;

// Define your pagination hook
export const usePagination = (
  itemsPerPage: number,
  fetchData: FetchFunction,
  filter?: string
) => {
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const pageQuery = searchParams.get("page");
    const page = pageQuery ? parseInt(pageQuery) : 1;
    setCurrentPage(page);

    async function loadItems() {
      const value = filter ? searchParams.get(filter) : undefined;
      const data = await fetchData(page, filter, value as string);

      setItems(data.items);
      setTotalPages(Math.ceil(data.count / itemsPerPage));
    }

    loadItems();
  }, [searchParams, itemsPerPage, fetchData, filter]);

  // Function to handle page changes and update the URL
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Update the URL based on the page number
    if (page === 1) {
      window.history.pushState({}, "", pathname);
    } else {
      window.history.pushState({}, "", `${pathname}?page=${page}`);
    }
  };

  return {
    items,
    currentPage,
    totalPages,
    handlePageChange,
  };
};
