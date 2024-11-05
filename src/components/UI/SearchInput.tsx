import Image from "next/image";
import React from "react";

export default function SearchInput({
  setSearch,
}: {
  setSearch: (query: string) => void;
}) {
  return (
    <>
      <Image src="/search.png" alt="serach bar" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}
