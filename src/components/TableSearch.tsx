import Image from "next/image";
import React from "react";
import SearchInput from "./UI/SearchInput";

function TableSearch({ setSearch }: { setSearch: (query: string) => void }) {
  return (
    <div className="w-full  md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 p-2">
      <SearchInput setSearch={setSearch} />
    </div>
  );
}

export default TableSearch;
